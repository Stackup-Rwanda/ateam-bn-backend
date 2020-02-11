import nodemailer from 'nodemailer';

/**
   * insert notification into Notification table in the DB.
   * @param {clientNotification} clientNotification after user request.
   * @returns {clientNotification} The user notification will stored.
   */
class Notification {
  // eslint-disable-next-line require-jsdoc
  async emailing(toName, toEmail, title, description) {
    const transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'barefootnomad800@gmail.com',
          pass: 'npkmlcmxqqglozzf'
        },
        logger: false,
        debug: false
      },
      {
        from: 'Barefoot Nomad Application <barefootnomad800@gmail.com>'
      }
    );

    const messageObj = {
      to: `${toName} <${toEmail}>`,
      subject: title,
      text: title,
      html: `<p>${description}</p>`
    };

    const realemail = await transporter.sendMail(messageObj);
    return realemail;
  }
}

const exportNotification = new Notification();
export default exportNotification;
