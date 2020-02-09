import Joi from '@hapi/joi';

const statusValidator = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().pattern(new RegExp('^Pending$|^Approved$|^Rejected$'))
    .trim()
    .required()
    .messages({ 'string.pattern.base': 'allowed trip status are: Pending, Approved, Rejected' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    const { details } = error;
    console.log(error)
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};

export default statusValidator;