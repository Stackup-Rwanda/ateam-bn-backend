import Sequelize from 'sequelize';
import models from '../models';

const { op } = Sequelize;
const { Trip } = models;
const { QueryTypes } = Sequelize;
const searchData = async (req, res) => {
  const values = req.body.id;
  const statusValue = req.body.status;
  console.log(values);
  if (statusValue) {
    const findByStatus = await Trip.findAll({ where: { status: statusValue } });
    res.send(findByStatus);
  }
  if (values) {
    const tripData = await Trip.findAll({ where: { id: parseInt(values, 10) } });
    res.send(tripData);
  }
};

export default searchData;
