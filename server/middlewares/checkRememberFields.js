const check = (req, res, next) => {
  const { rememberMe } = req.user;
  const { name, passportId, reasons } = req.body;
  if (rememberMe && (name || passportId || reasons)) {
    return res.status(400).json({ status: 400, error: 'to update the name/passport Number/reasons, first opt out of remember me' });
  }
  return next();
};

export default check;
