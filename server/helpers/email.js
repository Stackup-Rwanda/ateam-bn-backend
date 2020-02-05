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
const sendmail = async (email, name) => {
  try {
    const emailBody = generateEmail(
      name,
      'Welcome, this is Barefoot Nomad',
      'Please confirm your email',
      'Confirm email',
      `http://localhost:4000/user/${email}/confirm`
    );
    const emailTemplate = mailGenerator.generate(emailBody);
    mailer.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: `${email}`,
      from: 'BarefootNomad@noreply',
      subject: 'Barefoot Nomad Confirmation mail',
      text: `${name}Welcome to Barefoot nomad, please confirm your mail to get started`,
      html: emailTemplate
    };
    await mailer.send(message);
  } catch (error) {}
};
export default sendmail;
