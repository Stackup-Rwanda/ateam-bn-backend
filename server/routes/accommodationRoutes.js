import Router from 'express';
import multiparty from 'connect-multiparty';
import accommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import check from '../middlewares/accommodationFound';
import validateAccommodation from '../middlewares/validateAccommodations';
import { createRoom, retrieveRooms } from '../controllers/roomController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import { validateImage, ValidateBody } from '../middlewares/roomValidation';
import isManager from '../middlewares/isManager';
import bookingRoom from '../controllers/bookingContoller';
import { isBooked, ValidateBooking, dateChecker } from '../middlewares/bookingValidation';

const router = Router();
const multipart = multiparty();

router.get('/accommodation', isTokenValid, isTravelAdmin, accommodation.viewAll);
router.get('/accommodation/:id', isTokenValid, isTravelAdmin, check.CheckAccommodation, accommodation.viewSpecific);
router.delete(
  '/accommodation/:id/delete',
  isTokenValid,
  isTravelAdmin,
  check.CheckAccommodation,
  check.checkOwner,
  accommodation.DeleteOne
);
router.patch(
  '/accommodation/:id/edit',
  isTokenValid,
  isTravelAdmin,
  check.CheckAccommodation,
  check.checkOwner,
  multipart,
  validateAccommodation,
  accommodation.editAccommodation
);


router.post('/room', isTokenValid, isManager, multipart, ValidateBody("room", "body"), validateImage, asyncErrorHandler(createRoom));
router.get('/room', isTokenValid, asyncErrorHandler(retrieveRooms));
router.post('/room/book', isTokenValid, ValidateBooking("booking", "body"), dateChecker, isBooked, asyncErrorHandler(bookingRoom));
export default router;
