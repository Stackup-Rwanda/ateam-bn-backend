import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import TokenHelper from '../helpers/TokenHelper';
import AuthHelpers from '../helpers/authHelpers';
import {
  resetPasswordSubjectAndHtmlBoy,
  sendEmailTemplate,
} from '../helpers/emailHelper';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const resetPasswordURL = process.env.RESET_PASSWORD_URL;

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
 */
class EmailController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async sendResetPasswordEmail(req, res) {
    const { email } = req.body;

    const userExist = await AuthHelpers.emailExists(email);
    if (!userExist) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry! This email does not exist in Barefoot system.',
      });
    }

    const userData = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      password: userExist.password,
      createdAt: userExist.createdAt
    };

    const token = TokenHelper.generateResetPasswordToken(userData);
    const url = `${resetPasswordURL}${userExist.id}/${token}`;
    const subjectAndHhtmlBody = resetPasswordSubjectAndHtmlBoy(userData, url);
    const theMessage = sendEmailTemplate('support@borafoot.com', userData, subjectAndHhtmlBody);
    await sgMail.send(theMessage);

    res.status(200).json({
      status: res.statusCode,
      message: 'The email has been sent successfully.',
      userDetails: {
        Name: userData.name,
        Email: userData.email,
      },
    });
  }

  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async updatePassword(req, res) {
    const { userId, token } = req.params;

    const userExist = await AuthHelpers.userExists('id', userId);
    if (!userExist) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry! The user does not exist.',
      });
    }

    const tokenValide = TokenHelper.decodedToken(token, `${userExist.password}_${userExist.createdAt}`);

    if (!tokenValide) {
      res.status(400).json({
        status: res.statusCode,
        error: 'Sorry! You can not update the password with Expired token.',
      });
    }

    if (userExist.password !== tokenValide.password) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry! You can not update the password with Expired token.',
      });
    }

    await AuthHelpers.updateUserPassword(userExist.id, req.body);

    return res.status(200).json({
      status: res.statusCode,
      message: 'The password has been updated successfully.',
      userDetails: {
        Name: userExist.name,
        Email: userExist.email,
      },
    });
  }
}

export default EmailController;
