const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const { users } = require("./data");
const mongoose = require("mongoose");
const { createUser } = require("../services/helper");
const request = require("supertest");
const Contact = require("../models/contactModel");

const connectDB = require("../config/db");

const config = async () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await connectDB("mongodb://localhost/message_app_test");
  });

  beforeEach(async () => {
    await Promise.all(users.map(async (user) => await createUser(user)));
  });

  afterEach(async () => {
    // Clear the database and seed with initial data
    await User.deleteMany();
    await Contact.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};

config();
