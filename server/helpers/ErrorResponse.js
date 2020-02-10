const error4OOHappyJoi = (error, res, next) => {
  if (error) {
    const message = error.details.map((i) => i.message.replace(/"/g, '')).join(', ');
    res.status(400).json({
      status: res.statusCode,
      error: message,
    });
  } else next();
};

export default error4OOHappyJoi;
