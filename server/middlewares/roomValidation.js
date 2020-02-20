/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import Joi from '@hapi/joi';
import picture from '../helpers/uploadImage';


const roomSchema = {
  room: Joi.object().keys({
    accommodationId: Joi.number().integer().required(),
    roomType: Joi.string().required(),
    amenities: Joi.array().required(),
    cost: Joi.string().required(),
    status: Joi.string().valid('available', 'booked').insensitive(),
  }),

};

const ValidateBody = (schema, property) => {
  const prop = property;
  const useSchema = schema;
  return (req, res, next) => {
    const {
      error
    } = roomSchema[useSchema].validate(req[prop], schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  };
};

const validateImage = async (req, res, next) => {
  try {
    if (req.files && req.files.image) {
      let image;
      req.files.image.type || req.files.image.length
        ? image = await picture.uploader(req.files.image)
        : res.status(400).json({ status: 400, error: 'Please select one or more pictures' });

      !image || image.includes('null')
        ? res.status(415).json({ status: 415, error: 'Please select the right type of image' })
        : null;
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error
    });
  }
  next();
};


export
{
  validateImage,
  ValidateBody

};
