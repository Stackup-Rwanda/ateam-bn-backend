import dotenv from 'dotenv';
import AuthHelper from '../helpers/authHelpers';
import responses from '../helpers/responsesHelper';
import authorize from '../helpers/socialResponderHelper';

dotenv.config();

/**
 * This class handles all socialAuthentications process
 * signup & login with facebook and google
 */
class OauthController {
  /**
   * This method ensures database consistency.
   * it checks if the social_id is already saved. meaning that a user is already registered and wants to login
   * if the social_is new, then the user wants to register
   * it checks also the email to prevent duplication
   * @param {object} userData The user's data from facebook or google.
   * @returns {object} An object containing the isNew boolean property, user data and/or the error property.
   */
  static async validateUser(userData) {
    const { _json } = userData;
    const id = userData.provider === 'facebook' ? _json.id : _json.sub;
    const usernameArray = userData.displayName.split(' ');
    let userExists = await AuthHelper.userExists('social_id', id);
    if (userExists) {
      return { isNew: false, user: userExists };
    }
    userExists = await AuthHelper.userExists('email', userData.emails[0].value);
    if (userExists) {
      return { isNew: true, error: `email: ${userData.emails[0].value}, is already in use` };
    }
    userData.profilePhoto = userData.provider === 'facebook' ? `https://graph.facebook.com/${id}/picture?type=large` : _json.picture;

    let username = '';
    usernameArray.forEach((name) => {
      username += `${name}`;
    });
    userData.username = username;
    return { isNew: true, user: userData };
  }

  /**
   * This method handles OAuth.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data or token of the user.
   */
  static async storeAuth(req, res) {
    const { isNew, user, error } = await OauthController.validateUser(req.user);
    if (isNew) {
      if (!error) {
        AuthHelper.saveSocial(user)
          .then((newUser) => responses(201, res, newUser))
          .catch((err) => res.redirect(`${process.env.FRONT_END_URL}/login?error=${err.errors}`));
      } else {
        res.redirect(`${process.env.FRONT_END_URL}/login?error=${error}`);
      }
    } else {
      authorize(user, res);
    }
  }
}
export default OauthController;
