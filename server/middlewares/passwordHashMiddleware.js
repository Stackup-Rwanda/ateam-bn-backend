import Hasher from '../helpers/passwordHashHelper';

export default (req, res, next) => {
  /* istanbul ignore else */
  if (req.body.password) {
    req.body.password = Hasher.hashPassword(req.body.password);
    return next();
  }
};
