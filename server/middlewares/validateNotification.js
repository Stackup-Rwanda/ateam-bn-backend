import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string()
  .trim()
  .required()
  .valid('read', 'unread')
  .messages(messages);
const joiMessageFunction = (error, req, res, next) => {
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};
const markNotification = (req, res, next) => {
  const schema = Joi.object({
    viewed: validationObj({
      'string.required': 'viewed is required',
      'string.base': 'Invalid type, the viewed attribute must be a string',
      'string.empty': 'please enter something',
      'string.valid': 'Please enter read or unread'
    })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
export default markNotification;
