/* eslint-disable no-empty */
import mailer from '@sendgrid/mail';
import dotenv from 'dotenv';
import Mailgen from 'mailgen';

dotenv.config();

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'Barefoot Nomad',
    link: '#'
  }
});
const generateEmail = (name, intro, instructions, buttonText, link) => ({
  body: {
    name,
    intro,
    action: {
      instructions,
      button: {
        color: '#33b5e5',
        text: buttonText,
        link
      }
    },
    outro: 'Need help, or have questions? Just reply to this email, we would love to help.'
  }
});

const messageGenerator = async (email, name, intro, action, buttonText, link, subject, text) => {
  try {
    const emailBody = generateEmail(name, intro, action, buttonText, link);
    const emailTemplate = mailGenerator.generate(emailBody);
    mailer.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: `${email}`,
      from: 'BarefootNomad@noreply',
      subject,
      text,
      html: emailTemplate
    };
    await mailer.send(message);
  } catch (error) { }
};

const sendmail = async (email, name) => {
  messageGenerator(
    email,
    name,
    'Welcome, this is Barefoot Nomad',
    'Please confirm your email',
    'Confirm email',
    `http://localhost:${process.env.PORT}/user/${email}/confirm`,
    'Barefoot Nomad Confirmation mail',
    `${name}Welcome to Barefoot nomad, please confirm your mail to get started`
  );
};

const userRoleNotification = async (email, name, role) => {
  messageGenerator(
    email,
    name,
    `Your role has been updated to ${role}.`,
    'Click the button below to visit the Barefoot Nomad website',
    'BAREFOOT NOMAD',
    'https://ateam-bn-backend-staging.herokuapp.com/api',
    'User role status update',
    `Hello ${name}, your privileges have been upgraded.`
  );
};

export { sendmail, userRoleNotification };
