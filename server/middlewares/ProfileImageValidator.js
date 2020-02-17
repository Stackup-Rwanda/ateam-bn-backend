import genericValidator from './genericImageValidator';

const validateProfile = (req, res, next) => {
  genericValidator('image', req, res, next);
};

export default validateProfile;
