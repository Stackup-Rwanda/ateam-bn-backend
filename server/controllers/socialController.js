import AuthHelper from '../helpers/authHelpers';
import responses from '../helpers/responsesHelper';
import authorization from '../helpers/socialResponderHelper';

const storeAuth = (profile, fb) => {
  AuthHelper.userExists('email', profile.user.emails[0].value).then((facebookExists) => {
    authorization(facebookExists, fb);
    AuthHelper.saveSocial(profile.user).then((user) => responses(201, fb, user));
  });
};
const googleAuth = async (req, res) => {
  const doesExists = await AuthHelper.userExists('email', req.user.emails[0].value);
  authorization(doesExists, res);
  const user = await AuthHelper.saveSocial(req.user);
  responses(201, res, user);
};

export
{
  storeAuth,
  googleAuth
};
