import '../middlewares/googleStrategy';
import generateSocialToken from '../helpers/socialToken';
import models from '../models';

const { User } = models;
const googleAuth = (req, res) => {
  const google = req.user;
  res.status(201).json({
    status: 201,
    message: `welcome ${google.displayName}`,
    data: {
      token: generateSocialToken(google.displayName, google.id)
    }
  });
  User.create({
    name: google.displayName,
    google_id: google.id
  });
};

export default googleAuth;
