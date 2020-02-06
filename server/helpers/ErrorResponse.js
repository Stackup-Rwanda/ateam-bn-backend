const error4OOHappyJoi = (error, res, next) => {
  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message.replace(/"/g, ''),
    });
  } else next();
};

export default error4OOHappyJoi;
