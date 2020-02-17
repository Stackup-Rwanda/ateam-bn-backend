import importQuery from './authHelpers';
import importService from './emailService';

/**
 * This class contains all methods
 * Those stuff below will be called in controller.
 * const clientNotify = {
      title: 'REQUEST APPROVED', // req.request.title
      description: `Hello Joshua your request was approved successfully, you will have travel on Mon 23 Feb 2020 at 16:30`, // req.request.description
      email: 'k.joshua855@gmail.com', // req.request.email
      requester: 'Joshua', // req.request.username
      manager: 'agent Moriah', // req.request.agent
    };
  *  await notification.createNotification(clientNotify);

 * required to handle
 * viewing notification with app and send notification to email with app.
 */
class Notifications {
  /**
        * This function will use insertNotification method to store into DB.
        * This function will use emailing method to send email to users.
        * @param {object} clientNotify The user's request.
        * @param {object} clientNotify. The response.
        * @returns {object} The status and some data of the user.
        */
  async createNotification(clientNotify) {
    await importQuery.insertNotification(clientNotify);
    importService.emailing(clientNotify.requester, clientNotify.email, clientNotify.title, clientNotify.description);
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
