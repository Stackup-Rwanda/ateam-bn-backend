import models from '../models';
import AuthHelpers from '../helpers/authHelpers';
import { userRoleNotification } from '../helpers/email';

const { User } = models;

const updateRole = async (req, res) => {
  const { role } = req.body;
  const { username } = req.params;
  const exists = await AuthHelpers.userExists('username', username);
  if (exists) {
    return User.update({ role }, { where: { username } }).then((updated) => {
      if (!updated[0]) {
        throw new Error('unable to update role');
      }
      userRoleNotification(exists.email, exists.name, role).then(() => res.status(201).json({
        status: 201,
        message: 'user role updated successfully'
      }));
    }).catch((err) => res.status(500).json({
      status: 500,
      error: err.message
    }));
  }
  return res.status(404).json({ status: 404, error: `user with username ${username} does not exist` });
};

export default updateRole;
