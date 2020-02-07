import '../middlewares/fbStrategy';
import AuthHelper from '../helpers/authHelpers';
import '../middlewares/googleStrategy';
import tokenHelper from '../helpers/TokenHelper';

const storeAuth = (profile, fb) => {
  AuthHelper.userExists('email', profile.user.emails[0].value).then((facebookExists) => {
    if (facebookExists) {
      return fb.status(200).json({
        status: 200,
        message: `welcome ${facebookExists.name}`,
        data: {
          token: tokenHelper.generateToken(
            facebookExists.id,
            facebookExists.username,
            facebookExists.email,
            facebookExists.role
          )
        }
      });
    }AuthHelper.saveSocial(profile.user).then((user) => fb.status(201).send({
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
  if (doesExists) {
    return res.status(200).json({
      status: 200,
      message: `welcome ${doesExists.name}`,
      data: {
        token: tokenHelper.generateToken(
          doesExists.id,
          doesExists.username,
          doesExists.email,
          doesExists.role
        )
      }
    });
  }
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
