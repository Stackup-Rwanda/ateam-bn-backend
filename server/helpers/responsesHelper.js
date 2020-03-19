import dotenv from 'dotenv';
import tokenHelper from './TokenHelper';

dotenv.config();

const responses = async (code, response, data) => {
  const token = await tokenHelper.generateToken(data.id, data.username, data.email, data.role, true);
  response.redirect(`${process.env.FRONT_END_URL}/login?token=${token}`);
};

export default responses;
