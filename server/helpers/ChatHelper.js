import models from '../models';

const { User, Chat } = models;
/**
 * This class contains
 * all methods required to save/retrieve
 * the chat's data
 */
class ChatHelper {
  /**
   * Finds all chats has been sent.
   * @returns {object} The chat's data.
   */
  static async allChats() {
    const chats = await Chat.findAll({
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['username', 'role', 'profilePhoto'],
        }
      ]
    });

    if (!chats.length) return false;

    return chats;
  }

  /**
   * Save a chat in the DB.
   * @param {object} message The request sent by a user.
   * @returns {object} The comment's data.
   */
  static async saveChat(message) {
    const savedChat = await Chat.create(
      {
        ...message
      },
      {
        fields: [
          'userId', 'message', 'createdAt', 'updatedAt'
        ]
      }
    );
    return savedChat;
  }
}
export default ChatHelper;
