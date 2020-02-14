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
    const status = `REQUEST ${action.toUpperCase()}`;
    const description = `<span style='color: #7FD8A7 ;'>${status}</span> <br> 
      <span style='color: #614e1f;'> Hello, you have new notification for travel which is ${action} for more details
       clieck this link <span style='color: #044F72;'> https://ateam-bn-backend-staging.herokuapp.com/api/trips/${tripId}/ </span> </span><br><br>`;

    const actions = ['created', 'edited', 'rejected', 'approved', 'commentbyRequester', 'commentbyManager'];
    if (!(actions.includes(action))) {
      return res.status(400).json({
        status: 400,
        message: `Action Unknown`
      });
    }

    if (action === 'commentbyManager' || action === 'approved' || action === 'rejected') {
      socketIo.socket(requester.id, 'notification', description);
      await importQuery.insertNotification(tripId, requester.id, description);
      await importService.emailing(requester.username, requester.email, status, description);
    } else {
      socketIo.socket(manager.id, 'notification', description);
      await importQuery.insertNotification(tripId, manager.id, description);
      await importService.emailing(manager.username, manager.email, status, description);
    }
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
