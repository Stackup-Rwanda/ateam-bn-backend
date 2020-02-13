import Sequelize from 'sequelize';
import models from '../models';

const { Op } = Sequelize;
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
  const request = req.body.search;
  const findRequest = await Trip.findAll({
    where: {
      [Op.or]: [
        { id: parseInt(request, 10) },
        { userId: parseInt(request, 10) },
        { from: parseInt(request, 10) },
        { to: parseInt(request, 10) }
      ]
    }

  });

  if (request) {
    notFound(findRequest, res);
    res.status(200).send({
      status: 200,
      data: { findRequest }
    });
  }
};

export default searchData;
