import Router from 'express';
import validateToken from '../middlewares/tokenValidator';
import isSuperAdmin from '../middlewares/isSuperAdmin';
import { updateRole, getAllUsers, getAllManagers, assignManager } from '../controllers/userRoleController';
import validateRole from '../middlewares/roleValidator';
import validationClass from '../middlewares/assignManagerValidator';

const router = Router();

router.patch('/users/:username/role', validateToken, isSuperAdmin, validateRole, updateRole);
router.get('/users', validateToken, isSuperAdmin, getAllUsers);
router.get('/users/managers', validateToken, isSuperAdmin, getAllManagers);
router.put('/users/managers/assign', validateToken, isSuperAdmin, validationClass.validateFields, validationClass.validateIds, assignManager);

export default router;
