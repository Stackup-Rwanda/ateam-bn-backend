import { io } from '../index';
import userNotification from './authHelpers';

/* eslint-disable require-jsdoc */
/**
   * send notification to real receipt with application.
   * @param {SocketIo} SocketIo after user accessing application.
   * @returns {SocketIo} The user notifications will be displayed automatically.
   */
class SocketIo {
  socket(receiverId, notification, savedData) {
    const realData = io.sockets.in(receiverId).emit(notification, savedData);
    return realData;
  }

  async sock(id) {
    const receiver = await userNotification.retrieveOneNotificationById(id).then((userNotifications) => {
      io.emit('fechedUserNotification', userNotifications);
    });
    return receiver;
  }
}

const exportSocketIo = new SocketIo();
export default exportSocketIo;
