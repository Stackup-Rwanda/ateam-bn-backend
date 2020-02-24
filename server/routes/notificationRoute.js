import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import notifications from '../controllers/notificationController';
import markNotification from '../middlewares/validateNotification';
import isTokenValid from '../middlewares/tokenValidator';

const router = Router();

router.get('/user/notification', notifications.userNotification);
router.get('/notifications/:page', isTokenValid, notifications.viewNotifications, paginate.paginatedRetrievedData);
router.post('/notifications/:id/mark', isTokenValid, markNotification, notifications.markOne);
router.post('/notifications/mark', isTokenValid, markNotification, notifications.markAll);
export default router;
