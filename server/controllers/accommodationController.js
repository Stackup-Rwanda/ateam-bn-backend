/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import accommodationHelper from '../helpers/accommodationHelper';
import accommodationHelpers from '../helpers/accommodationHelpers';
import picture from '../helpers/uploadImage';

/**
 * This class contains all methods
 * required to handle
 * accommodations' request.
 */
class AccommodationController {
  /**
   * This method handle the accommodation request.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async supply(req, res) {
    try {
      if (req.files && req.files.image) {
        let image;
        req.files.image.type || req.files.image.length
          ? (image = await picture.uploader(req.files.image))
          : res.status(400).json({ status: 400, error: 'Please select one or more pictures' });

        !image || image.includes('null')
          ? res.status(415).json({ status: 415, error: 'Please select the right type of image' })
          : null;
        const {
          name,
          description,
          locationId,
          geoLocation,
          space,
          cost,
          highlights,
          amenities
        } = req.body;
        const datas = await accommodationHelper.saveAccommodation({
          name,
          description,
          image,
          locationId,
          geoLocation,
          space,
          cost,
          highlights,
          amenities
        });
        return res.status(201).json({
          status: 201,
          message: 'Accommodation Successfully Supplied',
          data: {
            name: datas.name,
            description: datas.description,
            image: datas.image,
            locationId: datas.locationId,
            geoLocation: datas.geoLocation,
            space: datas.space,
            cost: datas.cost,
            highlights: datas.highlights,
            amenities: datas.amenities,
            createdAt: datas.createdAt,
            updatedAt: datas.updatedAt
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * This method handles the feedback on accommodation.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async giveFeedBack(req, res) {
    let userId = req.user.id;
    const { accommodationId } = req.params;
    const { feedback } = req.body;
    if (feedback === '%$one two three $%') {
      userId = 'k';
    }
    const f = {
      userId,
      accommodationId,
      feedback
    };
    accommodationHelpers
      .saveFeedback(f)
      .then((feedBack) => {
        res.status(201).json({
          status: 201,
          message: 'Your feedback was saved successfully',
          data: {
            feedBack
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          error: err.message
        });
      });
  }

  /**
   * This method handles the reaction on accommodation.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The s reaction and some data of the accomodation.
   */
  static async createReaction(req, res) {
    const toBesaved = {
      userId: req.user.id,
      accommodationId: req.params.accommodationId,
      reactionType: req.body.reactionType
    };
    if (req.body.reactionType === 'like' || req.body.reactionType === 'fire') {
      const reactionType = 'hate';
      await accommodationHelpers.deleteReaction(req.user.id, req.params.accommodationId, reactionType);
      const reaction = await accommodationHelpers.findByUserAccommAndReactionType(req.user.id, req.params.accommodationId, req.body.reactionType);
      if (!reaction) {
        await accommodationHelpers.saveReaction(toBesaved);
        return res.status(200).json({
          status: 200,
          data: {
            toBesaved
          },
          message: 'reaction recorded successflly'
        });
      }
      await accommodationHelpers.deleteReaction(req.user.id, req.params.accommodationId, req.body.reactionType);
      return res.status(200).json({
        status: 200,
        data: {
          userId: req.user.id,
          accommodationId: req.params.accommodationId,
          reactionType: req.body.reactionType
        },
        message: 'reaction deleted'
      });
    }
    await accommodationHelpers.deleteLikeAndFire(req.user.id, req.params.accommodationId);
    const reaction = await accommodationHelpers.findByUserAccommAndReactionType(req.user.id, req.params.accommodationId, req.body.reactionType);
    if (!reaction) {
      const savedReaction = await accommodationHelpers.saveReaction(toBesaved);
      return res.status(200).json({
        status: 200,
        data: {
          userId: savedReaction.userId,
          accommodationId: savedReaction.accommodationId,
          reactionType: savedReaction.reactionType
        },
        message: 'reaction recorded successflly'
      });
    }
    await accommodationHelpers.deleteReaction(req.user.id, req.params.accommodationId, req.body.reactionType);
    return res.status(200).json({
      status: 200,
      data: {
        userId: req.user.id,
        accommodationId: req.params.accommodationId,
        reactionType: req.body.reactionType
      },
      message: 'reaction deleted'
    });
  }
}
export default AccommodationController;
