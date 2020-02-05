import '../middlewares/fbStrategy';
import generateSocialToken from '../helpers/socialToken';
import models from '../models';
import '../middlewares/googleStrategy';

const { User } = models;

const storeAuth = (req, res) => {
  res.status(200).json({
    status: 200,
    message: `welcome ${req.user.displayName}`,
    data: {
      token: generateSocialToken(req.user.DisplayName, req.user.id),
    }
  });

  User.create({
    name: req.user.displayName,
    fb_id: req.user.id
  });
};
const googleAuth = (req, res) => {
  res.status(200).json({
    status: 200,
    message: `welcome ${req.user.displayName}`,
    data: {
      token: generateSocialToken(req.user.displayName, req.user.id)
    }
  });
  User.create({
    name: req.user.displayName,
    google_id: req.user.id
  });
};
export default {
  googleAuth,
  storeAuth
};
