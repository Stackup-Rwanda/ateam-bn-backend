import models from '../models';
import AuthHelpers from '../helpers/authHelpers';
import pagination from '../helpers/paginateHelper';
import { userRoleNotification } from '../helpers/email';

const { User } = models;

const updateRole = async (req, res) => {
  let { role } = req.body;
  const { username } = req.params;
  const exists = await AuthHelpers.userExists('username', username);
  if (exists) {
    role = role.toUpperCase();
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

/* eslint-disable object-curly-newline */
/**
   * This method handle the users pagination.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived user.
   */
const getAllUsers = async (req, res, next) => {
  try {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const allUsers = await AuthHelpers.findAllUsers(skip, start);
    const userAllData = allUsers.rows;
    const countUserData = allUsers.count;
    if (allUsers.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `${req.user.username} No users found`
      });
    }
    req.data = { userAllData, countUserData, start, end, pages, skip, paginate };
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: ' something goes wrong ',
      error: error.message
    });
  }
};

/* eslint-disable object-curly-newline */
/**
   * This method handle the manager pagination.
   * @param {object} req The manager's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived manager.
   */
const getAllManagers = async (req, res, next) => {
  try {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const allManagers = await AuthHelpers.findAllManagers(skip, start);
    const userAllData = allManagers.rows;
    const countUserData = allManagers.count;
    if (allManagers.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `${req.user.username} No Manager found`
      });
    }
    req.data = { userAllData, countUserData, start, end, pages, skip, paginate };
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: ' something goes wrong ',
      error: error.message
    });
  }
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
