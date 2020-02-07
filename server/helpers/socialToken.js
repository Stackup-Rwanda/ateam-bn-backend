import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateSocialToken = (id, fbId) => jwt.sign({ id, fbId }, process.env.KEY);

export default generateSocialToken;
