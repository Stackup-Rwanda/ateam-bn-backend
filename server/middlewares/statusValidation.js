import Joi from '@hapi/joi';

const approveValidator = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().pattern(new RegExp('^Approved$'))
      .trim()
      .required()
      .messages({ 'string.pattern.base': 'allowed trip status is: Approved' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};

const rejectValidator = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().pattern(new RegExp('^Rejected$'))
      .trim()
      .required()
      .messages({ 'string.pattern.base': 'allowed trip status is: Rejected' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};

const ratingValidator = (req, res, next) => {
  const schema = Joi.object({
    stars: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .messages({ 'string.pattern.base': 'allowed stars are between 1 and 5 only' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};

export {
  approveValidator,
  rejectValidator,
  ratingValidator
};
