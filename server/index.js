import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import serverSocket from 'socket.io';
import allRoutes from './routes';
import apiDocumentation from '../swagger.json';
import "./middlewares/fbStrategy";
import "./middlewares/googleStrategy";
import userToNotifY from './helpers/socket';
import chatHelper from './helpers/ChatHelper';

dotenv.config();

const app = express();
const basePath = '/api';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, '../UI/html')));
app.use(basePath, allRoutes);
app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));


app.get('**', (req, res) => {
  res.status(400).send({
    status: 400,
    message: `Hey !! You are Welcome to BareFoot Nomad, Use the link below its documentation of application`,
    data: `/api/documentation`
  });
});
const socketListen = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

const io = serverSocket(socketListen);

io.on('connection', (socket) => {
  console.log('socket successfully connected');

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
});

export { io };
export default app;
