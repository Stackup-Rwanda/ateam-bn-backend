import express from 'express';
import importAuthUserRoute from '../controllers/authUserController';

const authUserRoute = express.Router();
authUserRoute.get('/users/logout', importAuthUserRoute.logout);
export default authUserRoute;
