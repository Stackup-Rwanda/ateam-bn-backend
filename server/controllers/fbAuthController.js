import '../middlewares/fbStrategy';
import generateSocialToken from '../helpers/socialToken';
import models from '../models';

const { User } = models;
const storeAuth = (req, res) => {
  const profile = req.user;
  res.status(200).json({
    status: 200,
    message: `welcome ${profile.displayName}`,
    data: {
      token: generateSocialToken(profile.DisplayName, profile.id),
    }
  });

  User.create({
    name: profile.displayName,
    fb_id: profile.id
  });
};
export default storeAuth;
