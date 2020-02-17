const allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

const checkExtension = (type, req) => {
  const extension = req.files[type].name.substr(req.files[type].name.lastIndexOf('.') + 1);
  if (allowedExtensions.includes(extension.toLowerCase())) {
    if (type === 'image') {
      req.imageIsUploadable = true;
    }
    if (type === 'cover') {
      req.coverIsUploadable = true;
    }
    return true;
  }
  return false;
};

const validate = (type, req, res, next) => {
  if (req.files && req.files[type]) {
    if (req.files[type].size) {
      return (checkExtension(type, req)) ? next() : res.status(415).json({ status: 415, error: 'jpg, jpeg, png, bmp are the only extensions allowed' });
    }
    return (req.files[type].length > 1) ? res.status(400).json({ status: 400, error: 'only one image is allowed' }) : next();
  }
  return next();
};

export default validate;
