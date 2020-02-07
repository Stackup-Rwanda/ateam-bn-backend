import Joi from '@hapi/joi';

const schemas = {
  trip: Joi.object().keys({
    tripType: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    reasons: Joi.string().required(),
    date: Joi.date().iso().required(),
    returnDate: Joi.date().iso(),
    accommodationId: Joi.number().integer().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected'),
  }),

};

const tripValidator = (schema, property) => {
  const prop = property;
  const useSchema = schema;
  return (req, res, next) => {
    const {
      error
    } = schemas[useSchema].validate(req[prop], schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map((i) => i.message).join(',');
      console.log('error', message);
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  };
};

export default tripValidator;
