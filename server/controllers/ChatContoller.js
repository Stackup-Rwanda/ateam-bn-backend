import chatHelper from '../helpers/ChatHelper';

/**
 * This class contains all methods about chat
 */
class ChatController {
  /**
   * This method used to send a message
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of a sent message.
   */
  static async getMessage(req, res) {
    const getChats = await chatHelper.allChats();

    return res.status(200).json({
      status: res.statusCode,
      data: getChats
    });
  }
}

export default ChatController;
