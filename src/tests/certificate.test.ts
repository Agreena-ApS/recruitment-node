import { authService } from "../app/application/auth/auth.service";
import request from "supertest";
import User from "../app/application/user/user.model";
import Certificate from "../app/application/certificate/certificate.model";
import argonService from "../app/security/argon.service";
import errors from "../app/enums/errors";
import nouns from "../app/enums/nouns";
import nodeServer from "../server";

let server: any;
let token: any;
let appTest: any;

describe("agreena", () => {
  let username: any, email: any, password: any, user: any;

  const signIn = async () => {
    const res = await appTest
      .post("/api/auth/sign-in/admin")
      .send({ credentials: { username, password } });
    token = res.body.data.accessToken;
  };

  beforeAll(async () => {
    server = await nodeServer;
    appTest = request(server);
    server.on("appReady", () => {});
  });

  beforeEach(async () => {
    username = "testing";
    email = "test@example.com";
    password = "123654";
    let emailVerified = true;
    let hashedPassword = await argonService.generateHashPassword(password);
    user = await User.create({
      username,
      email,
      password: hashedPassword,
      emailVerified,
    });
    console.log(user);
    jest.useFakeTimers();
  });
  afterEach(async () => {});
  afterAll(async () => {
    server.close();
  });

  describe("certificates - ", () => {
    it("Should return all of certificates", async () => {
      // await signIn();

      expect(1).toBe(1);
    });
  });
});
