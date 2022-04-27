import argonService from "../security/argon.service";
import userTypes from "../enums/userTypes.enum";
import User from "../application/user/user.model";
import colors from "colors/safe";
class UserLoader {
  async createAdminUser() {
    try {
      console.log("Creating Admin User ...");
      if (!(await User.exists({ username: "admin" }))) {
        let hashedPassword = await argonService.generateHashPassword("admin");
        await User.create({
          type: userTypes.admin,
          email: "sinasadigh@gmail.com",
          emailVerified: true,
          phoneNumber: "09141301683",
          phoneVerified: true,
          username: "admin",
          password: hashedPassword,
          protected: true,
        });
        console.info(colors.blue("Admin user created successfully"));
      }
      console.info(colors.blue("Admin user exists"));
    } catch (error) {
      console.log(error);
    }
  }
}

export const userLoader = new UserLoader();

