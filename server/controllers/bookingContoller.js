import BookingHelper from '../helpers/bookingHeleper';
import models from '../models';

const { Room } = models;
const bookingRoom = async (req, res) => {
  const requesterId = req.user.id;
  try {
    const roomExists = await BookingHelper.checkRoom(req.body);
    if (roomExists) {
      const bookRoom = await BookingHelper.saveBooked(req.body, requesterId);
      const updateStatus = await Room.update({ status: "booked" }, { where: { id: req.body.roomId } });
      res.status(201).send({
        status: 201,
        message: "you have successfully booked this room",
        data: {
          bookRoom,
          updateStatus
        }
      });
    }

    res.status(400).send({
      status: 400,
      error: "Sorry, the room you requested does not exist"
    });
  } catch (error) {
    return error;
  }
};

export default bookingRoom;
