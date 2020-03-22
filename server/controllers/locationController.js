import destinationsHelper from '../helpers/destinationsHelper';
import pagination from '../helpers/paginateHelper';

/**
 * This class contains all methods
 * required to display most travelled destinations
 */
class MostTravelledDestionController {
  /**
   * This method view most travelled destination.
   * @param {object} req the http request.
   * @param {object} res the response.
   * @returns {object} The most travelled destination with extra information.
   * .
   */
  static async findMostTravelledDestination(req, res) {
    try {
      const informations = await destinationsHelper.findVisitedTimes();
      if (informations.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `Hey ${req.user.username} !! No centre travelled yet !!`
        });
      }
      return res.status(200).json({
        status: 200,
        message: ` Hey ${req.user.username} !! Those are the most travelled destination ever !!`,
        data: { Title: 'Let Take Look on Top most Travelled Destinations', informations }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
        error: error.message
      });
    }
  }

  /* eslint-disable object-curly-newline */
  /**
   * This method handle the places pagination.
   * @param {object} req The place's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived places.
   */
  static async viewPlaces(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const placesData = await destinationsHelper.findPlaces(skip, start);
      const userAllData = placesData.rows;
      const countUserData = placesData.count;
      if (placesData.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `${req.user.username} No place found`
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
}

export default MostTravelledDestionController;
