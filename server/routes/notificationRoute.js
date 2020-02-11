import Router from 'express';
import NotificationController from '../controllers/notificationController';


const router = Router();

router
  .get('/user/notification', NotificationController.userNotification);

export default router;
