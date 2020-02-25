const checkRequester = (req, res, next) => {
  if (req.user.role !== 'Requester') {
    return res.status(401).json({ status: 401, error: 'only requesters are allowed to access this service' });
  }
  return next();
};

export default checkRequester;
