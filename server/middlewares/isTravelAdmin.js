const validateRole = (req, res, next) => {
  if (req.user.role === 'TRAVEL ADMINISTRATOR') {
    return next();
  }
  return res.status(401).json({ status: 401, error: 'You are not allowed to access this route' });
};

export default validateRole;
