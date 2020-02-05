import importQuery from '../helpers/authHelpers';
import importService from '../helpers/emailService';

/**
 * This class contains all methods
 * required to handle
 * viewing notification with app and send notification to email with app.
 */
class Notifications {
  /**
   * This function will use insertNotification method to store into DB.
   * This function will use emailing method to send email to users.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  async createNotification(req, res) {
    try {
      const clientNotify = {
        title: 'REQUEST APPROVED', // req.request.title
        dsscription: `Hello Joshua your request was approved successfully, you will have travel on Mon 23 Feb 2020 at 16:30`, // req.request.description
        email: 'k.joshua855@gmail.com', // req.request.email
        client: 'Joshua', // req.request.username
        agent: 'agent Moriah', // req.request.agent
        created: new Date().toString(),
        modified: 'none'
      };
      const clientNotification = await importQuery.insertNotification(clientNotify);
      importService.emailing(clientNotify.client, clientNotify.email, clientNotify.title, clientNotify.dsscription);
      return res.status(200).json({
        status: 200,
        message: ` New Notification`,
        data: clientNotification
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
        error: error.message
      });
    }
  }
}

const exportNotifications = new Notifications();
export default exportNotifications;
