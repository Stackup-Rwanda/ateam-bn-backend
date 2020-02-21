import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string().trim().required().messages(messages);
const joiMessageFunction = (error, req, res, next) => {
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};
const signUp = (req, res, next) => {
  const schema = Joi.object({
    name: validationObj({ 'string.required': 'name is required', 'string.base': 'Invalid type, your name must be a string', 'string.empty': 'Please enter your name' }),
    username: validationObj({ 'string.required': 'username is required', 'string.base': 'Invalid type, your username must be a string', 'string.empty': 'Please enter your username' }),
    email: validationObj({ 'string.base': 'Invalid type, your email must be a string', 'string.empty': 'Please enter your email', 'string.email': 'Your email is invalid, please enter a valid email' }).email(),
    password: validationObj({ 'string.base': 'Invalid type, your password must be a string', 'string.min': 'password must be at least 8 characters long', 'string.empty': 'Please enter your password' }).min(8).alphanum().max(50),
    passportId: validationObj({ 'string.base': 'Invalid type, your passportId must be a string', 'string.min': 'passportId must be at least 8 characters long', 'string.empty': 'Please enter your passportId' }).min(8).alphanum().max(8),
    gender: validationObj({ 'string.base': 'Invalid type, your gender must be a string', 'string.empty': 'Please enter your gender' }),
    birthdate: Joi.date().iso().required().messages({ 'date.base': 'Birthdate must be a date', 'date.format': 'your birthdate must be in the format YYYY-MM-DD' }),
    preferredLanguage: validationObj({ 'string.base': 'Invalid type, your preferred language must be a string', 'string.empty': 'Please enter your prefeered language' }),
    preferredCurrency: validationObj({ 'string.base': 'Invalid type, your preferred currency must be a string', 'string.empty': 'Please enter your preferred currency' }),
    locationId: Joi.number().integer().required().messages({ 'number.base': 'Invalid type, your location id must be a integer', 'number.empty': 'Please enter your location id' }),
    role: validationObj({ 'string.base': 'Invalid type, your role must be a string', 'string.empty': 'Please enter your role' }),
    department: validationObj({ 'string.base': 'Invalid type, your department must be a string', 'string.empty': 'Please enter your department' }),
    lineManager: Joi.number().integer().required().messages({ 'number.base': 'Invalid type, your line manager\'s id must be a integer', 'number.empty': 'Please enter your line manager\'s id' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
const signIn = (req, res, next) => {
  const schema = Joi.object({
    email: validationObj({ 'string.required': 'email is required', 'string.base': 'Invalid type, your email must be a string', 'string.empty': 'Please enter your email' }),
    password: validationObj({ 'string.required': 'Password is required', 'string.empty': 'Please enter your password' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
export {
  signUp,
  signIn
};
