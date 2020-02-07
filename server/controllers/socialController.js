import '../middlewares/fbStrategy';
import AuthHelper from '../helpers/authHelpers';
import '../middlewares/googleStrategy';
import tokenHelper from '../helpers/TokenHelper';
import authorization from '../helpers/socialResponderHelper';

const storeAuth = (profile, fb) => {
  AuthHelper.userExists('email', profile.user.emails[0].value).then((facebookExists) => {
    authorization(facebookExists, fb);
    AuthHelper.saveSocial(profile.user).then((user) => fb.status(201).send({
      status: 200,
      message: `welcome ${user.name} signup complete`,
      data: {
        token: tokenHelper.generateToken(user.id, user.username, user.email, user.role)
      }
    }));
  });
};
const googleAuth = async (req, res) => {
  const doesExists = await AuthHelper.userExists('email', req.user.emails[0].value);
  authorization(doesExists, res);
  const user = await AuthHelper.saveSocial(req.user);
  return res.status(201).send({
    status: 201,
    message: `welcome ${user.name} you are signed up`,
    data: {
      token: tokenHelper.generateToken(user.id, user.username, user.email, user.role)
    }
  });
};

export
{
  storeAuth,
  googleAuth
};
