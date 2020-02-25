import Router from 'express';
import multiparty from 'connect-multiparty';
import accommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import check from '../middlewares/accommodationFound';
import validateAccommodation from '../middlewares/validateAccommodations';

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
export default router;
