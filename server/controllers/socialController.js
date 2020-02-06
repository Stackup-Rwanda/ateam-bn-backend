import '../middlewares/fbStrategy';
import generateSocialToken from '../helpers/socialToken';
import AuthHelper from '../helpers/authHelpers';
import '../middlewares/googleStrategy';
import models from '../models';

const { User } = models;
const storeAuth = (profile, fb) => {
  fb.status(200).json({
    status: 200,
    message: `welcome ${profile.user.displayName}`,
    data: {
      token: generateSocialToken(profile.user.DisplayName, profile.id),
    }
  });

  User.create({
    name: profile.user.displayName,
    fb_id: profile.user.id
  });
};
const googleAuth = async (req, res) => {
  const doesExists = await AuthHelper.userExists('email', req.user.emails[0].value);

  if (doesExists) {
    return res.status(200).json({
      status: 200,
      message: `welcome ${doesExists.name}`,
      data: {
        token: generateSocialToken(doesExists.name, doesExists.id)
      }
    });
  }
  const user = await AuthHelper.saveSocial(req.user);

  return res.status(200).json({
    status: 200,
    message: `welcome ${user.name}`,
    data: {
      token: generateSocialToken(user.name, user.id)
    }
  });
};
export default {
  googleAuth,
  storeAuth
};
