import Router from 'express';
import tokenValidator from "../middlewares/tokenValidator";
import mostTravelledController from '../controllers/locationController';

const router = Router();
router.get('/location/most-travelled-destination', tokenValidator, mostTravelledController.findMostTravelledDestination);

export default router;
