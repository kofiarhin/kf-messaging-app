const { users } = require("./data");
const app = require("../app");
const request = require("supertest");
const User = require("../models/userModel");

jest.setTimeout(30000); // 30 seconds

describe("testing integration", () => {
  it("should register user properly", async () => {
    const userData = {
      name: "test",
      email: "test@gmail.com",
      password: "password",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(statusCode).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        conversations: expect.any(Array),
      })
    );
  });
  it("should login user properly", async () => {
    const userData = users[0];
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        _id: expect.any(String),
        conversations: expect.any(Array),
      })
    );
  });

  it("should not login user with invalid credentials", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send({ email: "some@gmail.com", password: "some password" });

    expect(statusCode).toBe(400);
    expect(body.message).toBe("user not found");
  });
});

describe("testing contacts", () => {
  it("should create user contacts properly", async () => {
    const userData = users[0];

    //  login user
    const { body, statusCode, headers } = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    const token = headers["set-cookie"][0].split("=")[1];

    // crreate contact
    const contactData = users[1];

    // create contact
    const { body: conBody, statusCode: conStatusCode } = await request(app)
      .post("/api/contacts")
      .set("Cookie", `jwt=${token}`)
      .send({ email: contactData.email });

    const expectedUser = await User.findOne({ email: contactData.email });

    expect(conBody.contacts.length).toBeGreaterThan(0);
    expect(conBody.contacts[0].userId).toBe(expectedUser._id.toString());
    expect(conBody.contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          userId: expect.any(String),
          conversationId: expect.any(String),
        }),
      ])
    );
  });
});
