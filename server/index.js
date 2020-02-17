import dotenv from 'dotenv';
import express from 'express';
import serverSocket from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import allRoutes from './routes/allRoutes';
import apiDocumentation from '../swagger.json';
import userNotification from './helpers/authHelpers';
import "./middlewares/fbStrategy";
import "./middlewares/googleStrategy";

dotenv.config();

const app = express();
const basePath = '/api';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
  console.log('server is running on port 3000');
});
const io = serverSocket(socketListen);
io.on('connection', (socket) => {
  console.log('socket Connection is successfully');
  socket.on('realReceipt', (data) => {
    socket.join(data);
    userNotification.retrieveOneNotificationById(data).then((userNotifications) => {
      socket.emit('fechedUserNotification', userNotifications);
    });
  });
});

export { io };
export default app;
