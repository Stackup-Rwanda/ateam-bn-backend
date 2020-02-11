import importQuery from './authHelpers';
import importService from './emailService';
import socketIo from "./socket";

/**
 * This class contains all methods
 * Those stuff below will be called in controller.
 * required to handle
 * viewing notification with app and send notification to email with app.
 */
class Notifications {
  /**
   *
      import notification from '../helpers/notifications';
      const request = {
        tripId: 20,
        receiverId: 3,
        username: req.user.username,
        status: 'pending',
        email: 'k.joshua855@gmail.com'
      };
      await notification.sendNotification(request);

   * This function will use insertNotification method to store into DB.
   * This function will use emailing method to send email to users.
   * @param {object} request The user's request.
   * @param {object} request. The response.
   * @returns {object} The status and some data of the user.
   */
  async sendNotification(request) {
    const notificationDetail = {
      tripId: request.tripId,
      receiverId: request.receiverId,
      description: `<span style='color: #7FD8A7 ;'>REQUEST ${request.status.toUpperCase()}</span> <br> 
      <span style='color: #614e1f;'> Hello ${request.username} you have new notification for travel which is ${request.status} 
      for more details clieck this link <span style='color: #044F72;'> http://localhost:1000/api/trips/${request.tripId}/ </span> </span><br><br>`,
      username: request.username,
      status: `REQUEST ${request.status}`
    };
    const savedData = await importQuery.insertNotification(notificationDetail);
    socketIo.socket(notificationDetail.receiverId, 'notification', savedData.description);
    await importService.emailing(request.username, request.email, notificationDetail.status.toUpperCase(), notificationDetail.description);
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
