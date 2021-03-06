import Joi from '@hapi/joi';

const validate = (req, res, next) => {
  const Schema = Joi.object().keys({
    role: Joi.string().trim()
      .required().pattern(new RegExp('^Super Administrator$|^Travel Administrator$|^Manager$|^Requester$', 'i'))
  });
  const result = Schema.validate({ role: req.body.role }, {
    abortEarly: false
  });
  const valid = result.error == null;
  if (valid) {
    return next();
  }
  return res.status(400).json({ status: 400, error: 'anly the follwing values are allowed: Super Administrator, Travel Administrator, Manager,Requester' });
};

export default validate;
