import socketIo from "./socket";
import importQuery from './authHelpers';
import { eventNotification } from './email';

/**
 * This class contains all methods
 * Those stuff below will be called in controller.
 * required to handle
 * viewing notification with app and send notification to email with app.
 */
class Notifications {
  /**
   * This function will be holding three value which will be passed as paramenters.
   * @param {integer} tripId The requestid.
   * @param {string} action The status of request.
   * @param {string} res This will display error when something is happened.
   * @returns {string} return user who created rquest.
   */
  async sendNotification(tripId, action, res) {
    const retrievedTrip = await importQuery.retrieveTrip(tripId);
    const requester = await importQuery.userDetails(retrievedTrip.userId);
    const manager = await importQuery.userDetails(requester.lineManager);
    const url = `https://ateam-bn-backend-staging.herokuapp.com/api/trips/${tripId}/`;
    const status = `REQUEST ${action.toUpperCase()}`;
    const appNotification = `<span style='color: #7FD8A7 ;'>${status}</span> <br> 
      <span style='color: #614e1f;'> Hello, you have new notification for travel which is ${action} for more details
       clieck the link <span style='color: #044F72;'><a href=${url}>${retrievedTrip.tripType}  Request</a> </span> </span><br><br>`;
    const emailNotification = `<span style='color: #7FD8A7 ;'>${status}</span> <br> 
      <span style='color: #614e1f;'> Hello, You have new notification for travel request which is <span style='color: #7FD8A7 ;'> ${action} </span> </span>`;
    const actions = ['Pending', 'Edited', 'Commented by Requester', 'Rejected', 'Approved', 'Commented by Manager'];
    if (!(actions.includes(action))) {
      return res.status(400).json({
        status: 400,
        message: `Action Unknown`
      });
    }

    if (action === 'Commented by Manager' || action === 'Approved' || action === 'Rejected') {
      socketIo.socket(requester.id, 'notification', appNotification);
      await importQuery.insertNotification(tripId, requester.id, appNotification);
      await eventNotification(requester.email, requester.username, url, emailNotification);
    } else {
      socketIo.socket(manager.id, 'notification', appNotification);
      await importQuery.insertNotification(tripId, manager.id, appNotification);
      await eventNotification(manager.email, manager.username, url, emailNotification);
    }
  }
}
const exportNotifications = new Notifications();
export default exportNotifications;
