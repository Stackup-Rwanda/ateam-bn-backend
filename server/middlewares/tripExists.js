import models from '../models';

const { Trip, User, Accommodations, Comment } = models;

const tripFound = async (id, req) => {
  const exists = await Trip.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'User',
        attributes: ['id', 'role', 'lineManager']
      },
      {
        model: Accommodations,
        as: 'Accommodations',
        attributes: ['id', 'image', 'name']
      },
      {
        model: Comment,
        as: 'Comments',
        attributes: ['id', 'comment', 'createdAt']
      }
    ]
  });
  if (exists) {
    req.oldTrip = exists;
    return true;
  }
  return false;
};

const checkTripId = async (req, res, next) => {
  let { id } = req.params;
  if (!Number.isNaN(Number(id))) {
    id = parseInt(id, 10);
    if (await tripFound(id, req)) {
      return next();
    }
    return res.status(404).json({ status: 404, error: `trip not found` });
  }
  return res.status(400).json({ status: 400, error: `malformed trip id ${id}` });
};

const isOwned = (req, res, next) => {
  const { oldTrip } = req;
  if (oldTrip.userId === req.user.id) {
    return next();
  }
  return res.status(401).json({ status: 401, error: 'not authorized to access this trip request' });
};

const isEditable = (req, res, next) => {
  const { oldTrip } = req;
  if (oldTrip.status === 'Pending') {
    return next();
  }
  return res.status(400).json({ status: 400, error: `You can only edit Pending trip requests` });
};

export { checkTripId, isOwned, isEditable };
