import AuthHelper from '../helpers/authHelpers';
import responses from '../helpers/responsesHelper';
import authorize from '../helpers/socialResponderHelper';

const storeAuth = (profile, fbResponse) => {
  AuthHelper.userExists('email', profile.user.emails[0].value).then((facebookUser) => {
    authorize(facebookUser, fbResponse);
    AuthHelper.saveSocial(profile.user).then((user) => responses(201, fbResponse, user));
  });
};
const googleAuth = async (req, res) => {
  const doesExists = await AuthHelper.userExists('email', req.user.emails[0].value);
  authorize(doesExists, res);
  const user = await AuthHelper.saveSocial(req.user);
  responses(201, res, user);
};
export
{
  storeAuth,
  googleAuth
};
