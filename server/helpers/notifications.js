import socketIo from "./socket";
import importQuery from './authHelpers';
import importService from './emailService';

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
        action: 'pending',
      };
      await notification.sendNotification(request);

   * This function will use insertNotification method to store into DB.
   * This function will use emailing method to send email to users.
   * @param {object} notification The user's request.
   * @param {object} notification. The response.
   * @returns {object} The status and some data of the user.
   */
  async sendNotification(notification) {
    const retrievedTrip = await importQuery.retrieveTrip(notification.tripId);
    const receiverId = await importQuery.userDetails(retrievedTrip.userId);
    const description = `<span style='color: #7FD8A7 ;'>REQUEST ${notification.action.toUpperCase()}</span> <br> 
      <span style='color: #614e1f;'> Hello, you have new notification for travel which is ${notification.action} for more details
       clieck this link <span style='color: #044F72;'> http://localhost:1000/api/trips/${notification.tripId}/ </span> </span><br><br>`;

    if (notification.action === 'commentbyManager' || notification.action === 'Approved' || notification.action === 'Rejected') {
      socketIo.socket(retrievedTrip.userId, 'notification', description);
      await importQuery.insertNotification(notification.tripId, retrievedTrip.userId, description);
      await importService.emailing(receiverId.username, receiverId.email, notification.action.toUpperCase(), description);
    }
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
