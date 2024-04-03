const errorHandler = async (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode);
  return res.status(statusCode).json({ message: error.message });
};

module.exports = {
  errorHandler,
};
