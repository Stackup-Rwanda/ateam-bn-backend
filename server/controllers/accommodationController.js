/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import accommodationHelper from '../helpers/accommodationHelper';
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
          ? image = await picture.uploader(req.files.image)
          : res.status(400).json({ status: 400, error: 'Please select one or more pictures' });

        !image || image.includes('null')
          ? res.status(415).json({ status: 415, error: 'Please select the right type of image' })
          : null;
        const {
          name, description, locationId, geoLocation, space, cost, highlights, amenities
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
}
export default AccommodationController;
