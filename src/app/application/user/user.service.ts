import Service from "../../helper/service/index";
import argonService from "../../security/argon.service";

import User from "./user.model";

class UserService extends Service {
  //CRUD Operations
  async create(userData: any) {
    try {
      let { password } = userData;
      delete userData.password;
      const hashedPassword = await argonService.generateHashPassword(password);
      return await User.create({ ...userData, password: hashedPassword });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getUsers(filter: any) {
    try {
      return await User.find(filter);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export const userService = new UserService();
