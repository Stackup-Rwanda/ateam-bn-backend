const validateRole = (req, res, next) => {
  if (req.user.role === 'Travel Administrator') {
    return next();
  }
  return res.status(401).json({ status: 401, error: 'You are not allowed to create an accommodation' });
};

export default validateRole;
