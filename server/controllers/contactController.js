const User = require("../models/userModel");
const Contact = require("../models/contactModel");

const addContact = async (req, res, next) => {
  try {
    const { email } = req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user does not exist");
    }

    // check if  user is storing own id
    const ownId = req.user._id == user._id.toString();

    console.log(req.user.id, user._id.toString());

    if (ownId) {
      res.status(400);
      throw new Error("you cannot store own email as contact");
    }
    // check if user id already stored
    const check = req.user.contacts.includes(user._id);

    if (check) {
      res.status(400);
      throw new Error("you have already added user");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { contacts: user._id },
      },
      { new: true }
    );
    const contact = Contact.create({
      userId: user._id,
      username: req.username,
    });

    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { contacts: req.body.contactId } },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    return res.json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
};
