import Router from 'express';
import path from 'path';
import ChatController from '../controllers/ChatContoller';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();
router.use(Router.static(path.join(`${__dirname}../../UI/html`)));
router.use(Router.static(path.join(`${__dirname}../../UI/html/chat.html`)));

router.get('/barefoot-login', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../UI/html/login.html`));
});

router.get('/barefoot-chat', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../UI/html/chat.html`));
});

router.get('/chats', tokenValidator, asyncErrorHandler(ChatController.getMessage));

export default router;
