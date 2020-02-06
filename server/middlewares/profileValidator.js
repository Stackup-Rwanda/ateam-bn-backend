import Joi from '@hapi/joi';

const stringValidator = (max, label) => Joi.string().min(3).max(max).label(label)
  .trim()
  .required();

const checker = (req, res, next) => {
  const Schema = Joi.object().keys({
    birthdate: Joi.date().required(),
    name: stringValidator(40, 'name'),
    gender: Joi.string().pattern(new RegExp('^male$|^female$')).label('gender').trim()
      .required(),
    preferredLanguage: Joi.string().max(40).label('preferredLanguage')
      .trim()
      .required(),
    preferredCurrency: stringValidator(6, 'preferredCurrency'),
    location: Joi.string().label('location').trim().required(),
  });
  const result = Schema.validate(req.body, {
    abortEarly: false
  });
  const valid = result.error == null;
  if (valid) {
    return next();
  }
  const { details } = result.error;
  const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
  return res.status(400).json({ status: 400, error: message });
};

export default checker;
