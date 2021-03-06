import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string()
  .trim()
  .required()
  .messages(messages);
const joiMessageFunction = (error, req, res, next) => {
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};
const createAccommodation = (req, res, next) => {
  const schema = Joi.object({
    name: validationObj({
      'string.required': 'name is required',
      'string.base': 'Invalid type, your name must be a string',
      'string.empty': 'Please enter your name'
    }),
    description: validationObj({
      'string.required': 'description is required',
      'string.base': 'Invalid type, your description must be a string',
      'string.empty': 'Please enter your description'
    }),
    locationId: validationObj({
      'string.base': 'Invalid type, your location must be an integer'
    }),
    geoLocation: validationObj({
      'string.base': 'Invalid type, your geoLocation must be a string',
      'string.empty': 'Please enter your geoLocation'
    }),
    highlights: validationObj({
      'string.base': 'Invalid type, highlights must be a string',
      'string.empty': 'Please enter some highlights'
    }),
    amenities: Joi.array().items(Joi.string())
      .required()
      .messages({
        'array.base': 'Amenities must be an array',
        'any.required': 'amenities are required'
      }),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
export default createAccommodation;
