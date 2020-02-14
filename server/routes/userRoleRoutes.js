import Router from 'express';
import validateToken from '../middlewares/tokenValidator';
import isSuperAdmin from '../middlewares/isSuperAdmin';
import userRoleController from '../controllers/userRoleController';
import validateRole from '../middlewares/roleValidator';

const router = Router();

router.patch('/users/:username/role', validateToken, isSuperAdmin, validateRole, userRoleController);

export default router;
