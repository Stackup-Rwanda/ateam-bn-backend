import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;
dotenv.config();

const ownerVerifier = async (req, res, next) => {
  try {
    const verified = jwt.verify(req.header('token'), process.env.SECRET_KEY);
    req.requesterEmail = verified.email;
    const pretender = await User.findOne({
      where: { email: req.requesterEmail }
    });
    if (pretender) {
      if (pretender.username === verified.username && req.params.username === pretender.username) {
        req.requesterId = pretender.id;
        return next();
      }
      res.status(401).json({ status: 401, error: 'unauthorized, profile not owned or token bears wrong data' });
    }
    console.log( req.requesterEmail );
    console.log(pretender);
    
    res.status(401).json({ status: 401, error: 'User not recognised' });
  } catch (error) {
    res.status(400).json({ status: 400, error: 'Malformed security token, check token and try again' });
  }
};

export default ownerVerifier;
