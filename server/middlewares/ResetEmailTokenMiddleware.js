import TokenHelper from '../helpers/TokenHelper';

export default async (req, res, next) => {
  try {
    const { token } = req.params;
    const { userExist } = req.body;

    TokenHelper.decodedToken(token, `${userExist.password}_${userExist.createdAt}`);
    return next();
  } catch (err) {
    res.status(401).json({
      status: res.statusCode,
      error: 'Sorry, the Token is invalide',
    });
  }

  // try {
  //   const { userId, token } = req.params;

  //   const userExist = await AuthHelpers.userExists('id', userId);
  //   if (!userExist) {
  //     return res.status(404).json({
  //       status: res.statusCode,
  //       error: 'Sorry! The user does not exist.',
  //     });
  //   }

  //   TokenHelper.decodedToken(token, `${userExist.password}_${userExist.createdAt}`);
  //   req.body.userExist = userExist;
  //   return next();
  // } catch (err) {
  //   res.status(401).json({
  //     status: res.statusCode,
  //     error: 'Sorry, the Token is invalide',
  //   });
  // }

};
