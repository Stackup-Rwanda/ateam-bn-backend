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
        description: req.body.description,
        image: url,
        status: req.body.status

      });
      res.status(200).send({
        status: 200,
        data: {
          addRoom
        }
      });
    }

    res.status(500).send({
      status: 500,
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
