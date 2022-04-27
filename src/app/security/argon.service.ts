import argon2 from "argon2";
import Service from "../helper/service/index";

class ArgonService extends Service {
  async generateHashPassword(password: string) {
    return await argon2.hash(password, {
      type: argon2.argon2i,
      timeCost: 50,
      memoryCost: 4096,
      hashLength: 50,
      parallelism: 1,
    });
  }
  async comparePassword(hashedPassword: string, password: string) {
    let result = false;
    result = await argon2.verify(hashedPassword, password);
    return result;
  }
}

export default new ArgonService();
