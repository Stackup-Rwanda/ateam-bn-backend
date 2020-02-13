import models from '../models';

const { Trip } = models;
const notFound = (noData, res) => {
  if (noData.length < 1) {
    res.status(404).send({
      status: 404,
      message: 'request with given input was not found'
    });
  }
};
const searchData = async (req, res) => {
  const requestId = req.body.id;
  const requestStatus = req.body.status;
  const requestOwner = req.body.userId;
  const requestDestination = req.body.to;
  const requestOrigin = req.body.from;

  if (requestStatus) {
    const findByStatus = await Trip.findAll({
      where: { status: requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1) }
    });
    res.status(200).send(findByStatus);
  }
  if (requestId) {
    const findById = await Trip.findAll({ where: { id: parseInt(requestId, 10) } });
    notFound(findById, res);
    res.status(200).send(findById);
  }
  if (requestOwner) {
    const findByOwner = await Trip.findAll({ where: { userId: parseInt(requestOwner, 10) } });
    notFound(findByOwner, res);
    res.status(200).send(findByOwner);
  }
  if (requestDestination) {
    const findByDestination = await Trip.findAll({
      where: { to: parseInt(requestDestination, 10) }
    });
    notFound(findByDestination, res);
    res.status(200).send(findByDestination);
  }
  if (requestOrigin) {
    const findByOrigin = await Trip.findAll({ where: { from: parseInt(requestOrigin, 10) } });
    notFound(findByOrigin, res);
    res.status(200).send(findByOrigin);
  }
};

export default searchData;
