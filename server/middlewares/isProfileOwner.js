const ownerVerifier = async (req, res, next) => {
  if (req.params.username === req.user.username) {
    return next();
  }
  return res.status(401).json({ status: 401, error: 'unauthorized, profile not owned or token bears wrong data' });
};

export default ownerVerifier;
