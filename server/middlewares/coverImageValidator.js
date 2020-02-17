import genericValidator from './genericImageValidator';

const validateCover = (req, res, next) => {
  genericValidator('cover', req, res, next);
};

export default validateCover;
