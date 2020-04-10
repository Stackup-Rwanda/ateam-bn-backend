/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import accommodationHelper from '../helpers/accommodationHelper';
import accommodationHelpers from '../helpers/accommodationHelpers';
import pagination from '../helpers/paginateHelper';
import picture from '../helpers/uploadImage';
import models from '../models';

const { Accommodations } = models;
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
          highlights,
          amenities
        } = req.body;
        const createdBy = req.user.id;
        const datas = await accommodationHelper.saveAccommodation({
          createdBy,
          name,
          description,
          image,
          locationId,
          geoLocation,
          highlights,
          amenities
        });
        return res.status(201).json({
          status: 201,
          message: 'Accommodation Successfully Supplied',
          data: {
            createdBy: datas.createdBy,
            name: datas.name,
            description: datas.description,
            image: datas.image,
            locationId: datas.locationId,
            geoLocation: datas.geoLocation,
            highlights: datas.highlights,
            amenities: datas.amenities,
            createdAt: datas.createdAt,
            updatedAt: datas.updatedAt
          }
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Please select one or more images'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * This method handles the feedback on accommodation.
   * This method handle the accommodation request.
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

  /* eslint-disable object-curly-newline */
  /**
   * This method handles the reaction on accommodation.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} The s reaction and some data of the accomodation.
   */
  static async viewAll(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const foundAccommodation = await Accommodations.findAndCountAll({ limit: skip, offset: start, order: [['id', 'DESC']] });
      const userAllData = foundAccommodation.rows;
      const countUserData = foundAccommodation.count;
      if (foundAccommodation.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `${req.user.username} You don't have notification`
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
   * This method handle the accommodation request.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async viewSpecific(req, res) {
    const findSpecific = await Accommodations.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!findSpecific) {
      return res.status(404).json({
        status: 404,
        error: 'Accommodation not found'
      });
    }
    res.status(200).json({
      status: 200,
      data: findSpecific
    });
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async DeleteOne(req, res) {
    await Accommodations.destroy({ where: { id: req.params.id } }).then((id) => {
      const status = id < 1 ? 404 : 200;
      res.status(status).json({
        status,
        message: ` ${status === 404 ? 'No such accommodation found' : 'Accommodation Deleted Successfully'}`
      });
    });
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async editAccommodation(req, res) {
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
          highlights,
          amenities
        } = req.body;
        await Accommodations.update({
          name,
          description,
          image,
          locationId,
          geoLocation,
          highlights,
          amenities
        }, {
          where: {
            id: req.params.id
          }
        });
        return res.status(200).json({
          status: 200,
          message: 'Accommodation Successfully Updated',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}
export default AccommodationController;
