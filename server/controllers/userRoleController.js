import models from '../models';
import AuthHelpers from '../helpers/authHelpers';
import { userRoleNotification } from '../helpers/email';

const { User } = models;

const updateRole = async (req, res) => {
  const { role } = req.body;
  const { username } = req.params;
  const exists = await AuthHelpers.userExists('username', username);
  if (exists) {
    await User.update({ role }, { where: { username } });
    await userRoleNotification(exists.email, exists.name, role);
    return res.status(201).json({
      status: 201,
      message: 'user role updated successfully'
    });
  }
  return res.status(404).json({ status: 404, error: `user with username ${username} does not exist` });
};

export default updateRole;
