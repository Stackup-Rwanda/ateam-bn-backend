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

const getAllUsers = async (req, res) => {
  const allUsers = await AuthHelpers.findAllUsers();
  res.status(200).json({ status: 200, data: allUsers });
};

const getAllManagers = async (req, res) => {
  const allManagers = await AuthHelpers.findAllManagers();
  res.status(200).json({ status: 200, data: allManagers });
};

const assignManager = async (req, res) => {
  const { managerId, requestersIds } = req;
  const updated = await User.update({ lineManager: managerId }, { where: { id: requestersIds } });
  if (updated.length) {
    return res.status(201).json({ status: 201, message: 'operation terminated successfully' });
  }
  return res.status(500).json({ status: 500, error: 'error occured while updating lineManager' });
};

export { updateRole, getAllUsers, getAllManagers, assignManager };
