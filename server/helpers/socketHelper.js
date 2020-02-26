import userToNotifY from './socket';
import chatHelper from './ChatHelper';

const socketHelper = (socket) => {
  socket.on('realReceipt', (data) => {
    socket.join(data);
    userToNotifY.sock(data);
  });

  socket.on('client-chat-message', async (messageData) => {
    const clientData = {
      userId: messageData.userId,
      message: messageData.message,
      createdAt: messageData.createdAt,
      updatedAt: messageData.createdAt
    };

    const savedChat = await chatHelper.saveChat(clientData);
    if (savedChat) socket.broadcast.emit('server-chat-message', messageData);
  });
};

export default { socketHelper };
