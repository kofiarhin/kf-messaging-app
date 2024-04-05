const getUser = async (req, res, next) => {
  try {
    res.status(400);
    throw new Error("something went wrong");
  } catch (error) {
    next(error);
  }
};

const getUsers = async (Req, res, next) => {
  return res.json({ message: "get users" });
};

module.exports = {
  getUser,
  getUsers,
};
