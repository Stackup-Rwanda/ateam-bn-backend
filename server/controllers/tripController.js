import tripHelpers from '../helpers/tripHelpers';
import pagination from '../helpers/paginateHelper';
import notification from '../helpers/notifications';
/**
 * This class contains all methods
 * required to handle
 * trip endpoints' request.
 */
class TripController {
  /**
   * This method figures out the trip type.
   * @param {object} trip The user's request.
   * @param {string} returnDate The response.
   * @param {integer} cityNumber The response.
   * @returns {object} The status and some data of the trip.
   */
  static async setTripType(trip, returnDate, cityNumber) {
    if (returnDate && cityNumber === 1) {
      trip.returnDate = returnDate;
      trip.tripType = 'Return';
    } else if (returnDate && cityNumber > 1) {
      trip.returnDate = returnDate;
      trip.tripType = 'Multi-city';
    } else {
      trip.tripType = 'One-way';
    }
    return trip;
  }

  /**
   * This method handle oneWayTrip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async oneWayTrip(req, res) {
    const { body } = req;
    const myuserId = req.user.id;
    const status1 = 'Pending';
    let newTrip = {
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

    newTrip = await TripController.setTripType(newTrip, returnDate, cityNumber);
    const saveTrip = await tripHelpers.saveTrip(newTrip);
    await notification.sendNotification(saveTrip.id, status1, res);
    return res.status(201).json({
      status: 201,
      message: 'Trip was created successfully.',
      data: saveTrip
    });
  }

  /**
   * This method handles all update_trip requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async editTrip(req, res) {
    const tripId = req.oldTrip.id;
    const status = 'Pending';
    const {
      name, passportId, from, to, date, reasons, accommodationId, returnDate
    } = req.body;
    const cityNumber = to.length;
    let tripUpdate = {
      name,
      passportId,
      from,
      to,
      date,
      reasons,
      accommodationId,
      status
    };

    tripUpdate = await TripController.setTripType(tripUpdate, returnDate, cityNumber);
    const updatedTrip = await tripHelpers.updateTrip(tripUpdate, tripId);
    notification.sendNotification(tripId, status, res);
    return res.status(201).json({
      status: 201,
      message: 'Trip was updated successfully.',
      data: updatedTrip
    });
  }

  /* eslint-disable object-curly-newline */
  /**
   * This method handles view all trip requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} The status and some data of the trip.
   */
  static async viewAllTrips(req, res, next) {
    try {
      const { role, id } = req.user;
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const foundTrips = await tripHelpers.findTripByRole(role, id, skip, start);


      const userAllData = foundTrips.rows;
      const countUserData = foundTrips.count;
      if (foundTrips.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `${req.user.username} You don't have trip request`
        });
      }
      req.data = { userAllData, countUserData, start, end, pages, skip, paginate };
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
        error: error.message
      });
    }
  }

  /**
   * This method handles all update_trip requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async viewOneTrip(req, res) {
    const { role, id } = req.user;
    const foundTrip = req.oldTrip;
    if (foundTrip.userId === id || role === 'Manager') {
      return res.status(200).json({
        status: 200,
        data: foundTrip
      });
    }
    res.status(401).json({
      status: 401,
      error: 'Unauthorized'
    });
  }
}
export default TripController;
