import RoomHelper from '../helpers/roomHelpers';
import imageUploader from '../helpers/imageUploader';
import models from '../models';

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

const retrieveRooms = async (req, res) => {
  try {
    const getRooms = await Room.findAll();
    res.status(200).send({
      status: 200,
      data: {
        getRooms

      },
    });
  } catch (error) {
    return error;
  }
};
export
{
  createRoom,
  retrieveRooms
};
