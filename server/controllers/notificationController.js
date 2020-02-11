/**
 * This class contains method to handle notifications route
 * required to handle notifications
 */
class NotificationController {
  /**
     * This method handle the html file.
     * @param {object} req The user's request.
     * @param {object} res The user's response.
     * @returns {object} The status and message.
     * */
  static async userNotification(req, res) {
    res.sendFile(`/notification.html`, { root: 'UI/html' });
  }
}

export default NotificationController;
