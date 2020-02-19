import ratingStars from 'star-ratings';
import AccommodationHelper from '../helpers/accommodationHelper';
import RatingHelper from '../helpers/ratingHelper';

/**
 * This class contains all methods
 * required to rate
 *  an accommodation.
 */
class RatingController {
  /**
   * This method approve the trip request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some the rating of the accommodation.
   */
  static async rateAccommodation(req, res) {
    const rated = await RatingHelper.findLatestRating(parseInt(req.params.id, 10));
    const { stars } = req.body;

    if (rated[0]) {
      const { ratings } = rated[0];
      ratings[stars - 1] += 1;

      const alreadyRated = await RatingHelper.findRatedRating(req.requesterUser.id, parseInt(req.params.id, 10));

      if (alreadyRated) {
        await RatingHelper.updateRating(ratings, rated[0].id);
      } else {
        await RatingHelper.createRating(req.requesterUser.id, parseInt(req.params.id, 10), ratings);
      }
    } else {
      const ratings = [0, 0, 0, 0, 0];
      ratings[stars - 1] += 1;

      await RatingHelper.createRating(req.requesterUser.id, parseInt(req.params.id, 10), ratings);
    }

    const recentRating = await RatingHelper.findLatestRating(parseInt(req.params.id, 10));
    const { ratings } = recentRating[0];

    const ratedAccommodation = await AccommodationHelper.findAccommodation('id', parseInt(req.params.id, 10));

    return res.status(200).json({
      status: 200,
      message: `You have successfully rated ${ratedAccommodation.name}, the rate is ${ratingStars(ratings)} now`,
      data: {
        rate: ratingStars(ratings)
      }
    });
  }
}

export default RatingController;
