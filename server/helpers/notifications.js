import importQuery from './authHelpers';
import importService from './emailService';

/**
 * This class will contain all methods
 * related to the notification tasks
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
