import Sequelize from 'sequelize';
import Joi from '@hapi/joi';
import models from '../models';
import { dateValidator, returnDate } from "../helpers/dateValidator";

const { Op } = Sequelize;
const {
  Bookings
} = models;

const isBooked = async (req, res, next) => {
  const roomIsBooked = await Bookings.findAll({
    where: {
      roomId: req.body.roomId,
      from: { [Op.lte]: req.body.from },
      to: { [Op.gte]: req.body.to },
    },
  });
  if (roomIsBooked.length) {
    return res.status(302).send({
      status: 302,
      message: 'the room you requested is booked please check other rooms'
    });
  }
  next();
};

const bookingSchema = {
  booking: Joi.object().keys({
    roomId: Joi.number().integer().required(),
    tripId: Joi.number().integer().required(),
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
  }),

};

const ValidateBooking = (schema, property) => {
  const prop = property;
  const useSchema = schema;
  return (req, res, next) => {
    const {
      error
    } = bookingSchema[useSchema].validate(req[prop], schema);
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

const dateChecker = async (req, res, next) => {
  const arrivalDate = dateValidator(req.body.from);
  const leavingDate = returnDate(req.body.to, req.body.from);
  if (arrivalDate) {
    return res.status(422).json({
      status: 422,
      error: 'This date is in the past, please choose a future date.'
    });
  }
  if (leavingDate) {
    return res.status(422).json({
      status: 422,
      error: 'Your leaving date is lower than arrival date.'
    });
  }
  next();
};
export
{
  isBooked,
  dateChecker,
  ValidateBooking
};
