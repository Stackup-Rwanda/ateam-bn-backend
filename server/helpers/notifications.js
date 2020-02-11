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
   * This function will use insertNotification method to store into DB.
   * This function will use emailing method to send email to users.
   * @param {object} information The user's request.
   * @param {object} information. The response.
   * @returns {object} The status and some data of the user.
   */
  async sendNotificationToRequester(information) {
    const requesterNotify = {
      title: `REQUEST ${information.status}`,
      requester: information.requester,
      manager: information.manager,
      email: `${information.email}`,
      status: information.status,
      comment: `${information.comment}`,
    };
    const savedNotification = await importQuery.insertNotification(requesterNotify);
    const description = `Hello ${information.requester} your request was ${information.status} by Manager ${information.manager} on ${new Date()}
      for more details about your travel clieck link below http://localhost:1000/api/users/notifications/${savedNotification.id}/`;
    importService.emailing(information.requester, information.email/* email of requester */, requesterNotify.title, description);
  }

  /**
   * This function will use insertNotification method to store into DB.
   * This function will use emailing method to send email to manager.
   * @param {object} information The manager's response.
   * @param {object} information. The response.
   * @returns {object} The status and some data of the response.
   */
  async sendNotificationToManager(information) {
    const managertNotify = {
      title: `REQUEST ${information.status}`,
      requester: information.requester,
      manager: 'Manager',
      email: information.email,
      status: information.status,
      comment: `${information.comment}`,
    };
    const savedNotification = await importQuery.insertNotification(managertNotify);
    const description = `Hello Manager a client ${information.requester} has ${information.status} request on ${new Date()} 
    for more details about this travel clieck link below http://localhost:1000/api/users/notifications/${savedNotification.id}/`;
    importService.emailing(managertNotify.manager, information.email/* email of manager */, managertNotify.title, description);
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
