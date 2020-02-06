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
};
