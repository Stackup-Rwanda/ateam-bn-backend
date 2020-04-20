import dotenv from 'dotenv';
import userToNotifY from './socket';
import chatHelper from './ChatHelper';
import tokenHelper from './TokenHelper';
import authHelper from './authHelpers';
import { io } from '../index';

dotenv.config();

let connectedClients = [];

const authenticateToken = async (token) => {
  try {
    const decodedToken = tokenHelper.decodedToken(token, process.env.SECRET_KEY);
    const userExists = await authHelper.userExists('id', decodedToken.id);
    return userExists;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

const socketHelper = (socket) => {
  socket.on('realReceipt', (data) => {
    socket.join(data);
    userToNotifY.sock(data);
  });

  socket.on('client-chat-message', async (incomingData) => {
    const { messageDetails, token } = incomingData;
    const userExists = await authenticateToken(token, process.env.SECRET_KEY);
    if (userExists) {
      const clientData = {
        userId: userExists.id,
        message: messageDetails.message,
        createdAt: messageDetails.createdAt,
        updatedAt: messageDetails.createdAt
      };
      const savedChat = await chatHelper.saveChat(clientData);
      if (savedChat) {
        io.emit('server-chat-message', {
          createdAt: savedChat.createdAt,
          id: savedChat.id,
          message: savedChat.message,
          updatedAt: savedChat.updatedAt,
          userId: savedChat.userId,
          Users: {
            role: userExists.role,
            username: userExists.username,
            profilePhoto: userExists.profilePhoto
          }
        });
      }
    }
  });

  socket.on('get-online-users', async ({ token }) => {
    const userExists = await authenticateToken(token);
    if (userExists) {
      socket.emit('online-users', connectedClients);
    }
  });

  socket.on('connect-client', async ({ token }) => {
    const userExists = await authenticateToken(token);
    if (userExists) {
      socket.emit('connected-successfully', {
        username: userExists.username,
        profilePhoto: userExists.profilePhoto,
        messageLastSeen: userExists.messageLastSeen
      });
      const isAlreadyIn = connectedClients.find((client) => (client.username === userExists.username));
      if (!isAlreadyIn) {
        connectedClients.push({
          username: userExists.username,
          role: userExists.role,
          profilePhoto: userExists.profilePhoto,
          connectionId: socket.id
        });
        socket.broadcast.emit('online-users', connectedClients);
      } else if (isAlreadyIn.connectionId !== socket.id) {
        isAlreadyIn.connectionId = socket.id;
      }
    }
  });

  socket.on('disconnect', () => {
    connectedClients = connectedClients.filter((client) => (client.connectionId !== socket.id));
    socket.broadcast.emit('online-users', connectedClients);
  });

  socket.on('read', async (token) => {
    const userExists = await authenticateToken(token);
    if (userExists) {
      const isAlreadyIn = connectedClients.find((client) => (client.connectionId === socket.id));
      if (isAlreadyIn) {
        await authHelper.updateLastSeen(userExists.id);
      }
    }
  });
};

export default { socketHelper };
