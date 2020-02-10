import tripHelpers from '../helpers/tripHelpers';

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
    body.userId = 1;
    const status1 = 'Pending';
    const newTrip = {
      tripType: body.tripType,
      from: body.from,
      to: body.to,
      date: body.date,
      reasons: body.reasons,
      accommodationId: body.accommodationId,
      userId: body.userId,
      status: status1
    };
    const { returnDate } = body;
    console.log(returnDate);
    if (returnDate) {
      newTrip.returnDate = returnDate;
    }
    const saveTrip = await tripHelpers.saveTrip(newTrip);

    return res.status(201).json({
      status: 201,
      message: 'Trip was created successfully.',
      data: saveTrip
    });
  }
}

export default TripController;
