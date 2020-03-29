import dotenv from 'dotenv';
import models from '../models';
import imageUploader from '../helpers/imageUploader';
import AuthHelpers from '../helpers/authHelpers';

const { User } = models;

dotenv.config();

const viewProfile = async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      id: req.user.id
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
      lineManager: foundUser.lineManager,
      profilePhoto: foundUser.profilePhoto,
      coverPhoto: foundUser.coverPhoto
    }
  });
};

const editProfile = async (req, res) => {
  let profileImageLink = null;
  let coverLink = null;
  try {
    if (req.imageIsUploadable) {
      profileImageLink = await imageUploader(req.files.image);
    }
    if (req.coverIsUploadable) {
      coverLink = await imageUploader(req.files.cover);
    }
    await User.update(
      {
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        preferredLanguage: req.body.preferredLanguage,
        preferredCurrency: req.body.preferredCurrency,
        location: req.body.location,
        profilePhoto: profileImageLink,
        coverPhoto: coverLink
      },
      {
        where: { id: req.user.id }
      }
    );
    res.status(201).json({
      status: 201,
      message: 'user profile updated successfully'
    });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const rememberProfile = async (req, res) => {
  const userId = req.user.id;
  const { state } = req.params;
  if (state === 'true' || state === 'false') {
    await AuthHelpers.UpdateRememberMe(userId, state);
    return res.status(200).json({
      status: 200,
      message:
        state === 'true'
          ? 'your profile will be remembered on your next request initiation'
          : 'your profile will not be remembered on your next request initiation'
    });
  }
  return res.status(400).json({
    status: 400,
    message: 'Wrong parameter, please provide true or false as parameters.'
  });
};

export { viewProfile, editProfile, rememberProfile };
