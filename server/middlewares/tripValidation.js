import Joi from '@hapi/joi';

import tripHelpers from '../helpers/tripHelpers';
import placeHelpers from '../helpers/placeHelpers';
import AccommodationHelpers from "../helpers/accommodationHelpers";

import dateValidator from "../helpers/dateValidator";

const schemas = {
  trip: Joi.object().keys({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    birthdate: Joi.date().iso().required(),
    rememberMe: Joi.boolean().required(),
    tripType: Joi.string().required(),
    from: Joi.number().integer(),
    to: Joi.number().integer(),
    reasons: Joi.string().required(),
    date: Joi.date().iso().required(),
    returnDate: Joi.date().iso(),
    accommodationId: Joi.number().integer().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected'),
  }),

};

export const tripValidator = (schema, property) => {
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

export const tripChecker = async (req, res, next) => {
  const {
    body,
    user
  } = req;
  const userId = user.id;
  const tripExists = await tripHelpers.reasonsDate({ ...body, userId });
  const placeExistsFrom = await placeHelpers.placeExist(body.from);
  const placeExistsTo = await placeHelpers.placeExist(body.to);
  const isValideDate = dateValidator(body.date);
  const accommodation = {
    id: body.accommodationId,
    placeId: body.to
  };
  const accommo = await AccommodationHelpers.accommodationInPlaceExist(accommodation);
  if (!placeExistsFrom || !placeExistsTo) {
    return res.status(422).json({
      status: 422,
      error: 'choose proper location.'
    });
  }
  if (!accommo) {
    return res.status(422).json({
      status: 422,
      error: 'choose proper accommodation.'
    });
  }
  if (isValideDate) {
    return res.status(422).json({
      status: 422,
      error: 'This date is in the past, please choose a future date.'
    });
  }
  if (tripExists) {
    return res.status(409).json({
      status: 409,
      error: 'This trip already exists, use another reasons or date.'
    });
  }
  next();
};
