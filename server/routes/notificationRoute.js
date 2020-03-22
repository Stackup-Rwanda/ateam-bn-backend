import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import isTokenValid from '../middlewares/tokenValidator';
import notifications from '../controllers/notificationController';
import markNotification from '../middlewares/validateNotification';

const router = Router();

router.get('/user/notification', notifications.userNotification);
router.get('/notifications/', isTokenValid, notifications.viewNotifications, paginate.paginatedRetrievedData);
router.post('/notifications/:id/mark', isTokenValid, markNotification, notifications.markOne);
router.post('/notifications/mark', isTokenValid, markNotification, notifications.markAll);
export default router;
