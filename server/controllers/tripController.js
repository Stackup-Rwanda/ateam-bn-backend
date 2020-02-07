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
    const status1 = 'pending';
    const tripExists = await tripHelpers.reasonsDate(body);
    if (tripExists) {
      return res.status(409).json({
        status: 409,
        error: 'This trip already exists, use another reasons or date.'
      });
    }
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
    const saveTrip = await tripHelpers.saveTrip(newTrip);

    return res.status(201).json({
      status: 201,
      message: 'Trip was created successfully.',
      data: saveTrip
    });
  }
}

export default TripController;
