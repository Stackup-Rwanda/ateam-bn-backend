import dotenv from 'dotenv';
import models from '../models';
import imageUploader from '../helpers/imageUploader';

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
      profileImageLink = await imageUploader(req.files.image, res);
    }
    if (req.coverIsUploadable) {
      coverLink = await imageUploader(req.files.cover, res);
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

export {
  viewProfile,
  editProfile
};
