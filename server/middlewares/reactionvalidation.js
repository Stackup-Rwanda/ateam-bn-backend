import Joi from '@hapi/joi';

const validateReaction = (req, res, next) => {
  const schema = Joi.object({
    reactionType: Joi.string().valid('like', 'hate', 'fire')
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({ status: 400, error: 'reactionType must be one of like,fire or hate' });
  }
  return next();
};

export default validateReaction;
