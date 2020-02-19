import tripHelpers from '../helpers/tripHelpers';
import notification from '../helpers/notifications';

/**
 * This class contains all methods
 * required to handle
 * trip endpoints' request.
 */
class TripController {
  /**
   * This method handle oneWayTrip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async oneWayTrip(req, res) {
    const { body } = req;
    console.log(req.user.id);
    const myuserId = req.user.id;
    const status1 = 'Pending';
    const newTrip = {
      name: body.name,
      passportId: body.passportId,
      tripType: body.tripType,
      from: body.from,
      to: body.to,
      date: body.date,
      reasons: body.reasons,
      accommodationId: body.accommodationId,
      userId: myuserId,
      status: status1
    };
    const { returnDate, to } = body;
    const cityNumber = to.length;

    if (returnDate && cityNumber === 1) {
      newTrip.returnDate = returnDate;
      newTrip.tripType = 'Return';
    } else if (returnDate && cityNumber > 1) {
      newTrip.returnDate = returnDate;
      newTrip.tripType = 'Multi-city';
    } else {
      newTrip.tripType = 'One-way';
    }
    const saveTrip = await tripHelpers.saveTrip(newTrip);
    await notification.sendNotification(saveTrip.id, status1, res);
    return res.status(201).json({
      status: 201,
      message: 'Trip was created successfully.',
      data: saveTrip
    });
  }
}

export default TripController;
