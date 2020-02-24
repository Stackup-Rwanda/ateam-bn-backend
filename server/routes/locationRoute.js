import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import tokenValidator from "../middlewares/tokenValidator";
import locations from '../controllers/locationController';

const router = Router();
router.get('/places', tokenValidator, locations.viewPlaces, paginate.paginatedRetrievedData);
router.get('/location/most-travelled-destination', tokenValidator, locations.findMostTravelledDestination);

export default router;
