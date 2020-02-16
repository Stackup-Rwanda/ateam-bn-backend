import Joi from '@hapi/joi';

import tripHelpers from '../helpers/tripHelpers';
import placeHelpers from '../helpers/placeHelpers';
import AccommodationHelpers from "../helpers/accommodationHelpers";

import { dateValidator, returnDate } from "../helpers/dateValidator";

const schemas = {
  trip: Joi.object().keys({
    name: Joi.string().required(),
    passportId: Joi.string().required().min(8).max(8)
      .alphanum(),
    reasons: Joi.string().required(),
    tripType: Joi.string().required().valid('One-way', 'Return', 'Multi-city'),
    from: Joi.number().integer(),
    to: Joi.array().items(Joi.number().integer()),
    date: Joi.date().iso().required(),
    returnDate: Joi.date().iso(),
    accommodationId: Joi.number().integer().required(),
    status: Joi.string().valid('Pending', 'Approved', 'Rejected'),
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
  const placesIds = body.to;
  const userId = user.id;
  const tripExists = await tripHelpers.reasonsDate({
    ...body,
    userId
  });
  const placeExistsFrom = await placeHelpers.placeExist(body.from);
  const placeExistsTo = await placeHelpers.placeExist(body.to);
  const isValideDate = dateValidator(body.date);
  const isRtnDate = returnDate({ Rdate: body.returnDate, Sdate: body.date });
  const accommodation = {
    id: body.accommodationId,
    locationId: placesIds
  };
  const accommo = await AccommodationHelpers.accommodationInPlaceExist(accommodation);
  if (!placeExistsFrom) {
    return res.status(422).json({
      status: 422,
      error: 'choose proper location.'
    });
  }
  if (!placeExistsTo) {
    return res.status(422).json({
      status: 422,
      error: 'choose proper location.'
    });
  }
  if (isRtnDate) {
    return res.status(422).json({
      status: 422,
      error: 'Your return date is lower then Travel date.'
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
