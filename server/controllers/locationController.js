import destinationsHelper from '../helpers/destinationsHelper';

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
}

export default MostTravelledDestionController;
