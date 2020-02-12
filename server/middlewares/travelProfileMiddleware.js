import authHelper from '../helpers/authHelpers';

const travelRequestMiddleware = (req, res, next) => {
  const userId = req.user.id;
  const updatedUser = authHelper.updateRememberMe(userId, req.body.rememberMe);
  next();
  return updatedUser;
};

export default travelRequestMiddleware;
