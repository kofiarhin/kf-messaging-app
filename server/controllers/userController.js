const getUser = async (req, res, next) => {
  try {
    res.status(400);
    throw new Error("something went wrong");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
};
