import models from '../models';
import RoomHelper from '../helpers/roomHelpers';
import pagination from '../helpers/paginateHelper';
import imageUploader from '../helpers/imageUploader';

const { Room } = models;
const createRoom = async (req, res) => {
  try {
    const realAccommodation = await RoomHelper.checkAccommodation(req.body);
    if (realAccommodation) {
      const url = await imageUploader(req.files.image);
      const addRoom = await RoomHelper.saveRoom({
        accommodationId: req.body.accommodationId,
        roomType: req.body.roomType,
        amenities: req.body.amenities,
        cost: req.body.cost,
        image: url,
        status: req.body.status,
      });
      res.status(201).send({
        status: 201,
        data: {
          addRoom
        }
      });
    }

    res.status(400).send({
      status: 400,
      error: "provide the correct accommodation"
    });
  } catch (error) {
    return error;
  }
};
/* eslint-disable object-curly-newline */
/**
 * This method handle the rooms pagination.
 * @param {object} req The room's request.
 * @param {object} res The response.
 * @param {function} next The next action.
 * @returns {object} retrived rooms.
 */
const retrieveRooms = async (req, res, next) => {
  try {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const getRooms = await Room.findAndCountAll({ limit: skip, offset: start });
    const userAllData = getRooms.rows;
    const countUserData = getRooms.count;
    if (getRooms.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `${req.user.username} You don't have room`
      });
    }
    req.data = { userAllData, countUserData, start, end, pages, skip, paginate };
    next();
  } catch (error) {
    return error;
  }
};
export {
  createRoom,
  retrieveRooms
};
