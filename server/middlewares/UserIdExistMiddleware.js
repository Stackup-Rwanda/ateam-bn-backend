import AuthHelpers from '../helpers/authHelpers';

export default async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userExist = await AuthHelpers.userExists('id', userId);
    req.body.userExist = userExist;
    return next();
  } catch (err) {
    res.status(404).json({
      status: res.statusCode,
      error: 'Sorry! The user does not exist.',
    });
  }
};
