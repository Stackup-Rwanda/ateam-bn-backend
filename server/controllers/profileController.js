import dotenv from 'dotenv';
import models from '../models';

const { User } = models;

dotenv.config();

const viewProfile = async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  res.status(200).json({
    status: 200,
    data: {
      name: foundUser.name,
      email: foundUser.email,
      gender: foundUser.gender,
      birthdate: foundUser.birthdate,
      preferredLanguage: foundUser.preferredLanguage,
      preferredCurrency: foundUser.preferredCurrency,
      homeAddress: foundUser.location,
      role: foundUser.role,
      department: foundUser.department,
      lineManager: foundUser.lineManager
    }
  });
};

const editProfile = async (req, res) => {
  await User.update(
    {
      name: req.body.name,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      preferredLanguage: req.body.preferredLanguage,
      preferredCurrency: req.body.preferredCurrency,
      location: req.body.location
    },
    {
      where: { id: req.requesterId }
    }
  );
  res.status(201).json({
    status: 201,
    message: 'user profile updated successfully'
  });
};

export {
  viewProfile,
  editProfile
};
