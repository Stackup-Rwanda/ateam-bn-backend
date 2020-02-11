import { io } from '../index';

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
}

const exportSocketIo = new SocketIo();
export default exportSocketIo;
