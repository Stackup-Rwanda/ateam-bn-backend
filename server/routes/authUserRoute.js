import express from 'express';
import importAuthUserController from '../controllers/authUserController';

const authUserRoute = express.Router();
authUserRoute.get('/users/logout', importAuthUserController.logout);
export default authUserRoute;
