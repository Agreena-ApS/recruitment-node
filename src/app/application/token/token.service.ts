import Service from "../../helper/service/index";
import Token from "./token.model";
import config from "config";

import moment from "moment";
import generator from "../../utils/generator";

import tokenTypes from "../../enums/tokenTypes";

class TokenService extends Service {
  async generateRefreshTokenForUser(userId: any) {
    const refreshToken = (
      generator.generateUUIDV4() + generator.generateUUIDV4()
    ).replace(/-/g, "");
    let refreshTokenExpirationInDays: number = config.get(
      "refreshTokenExpirationInDays"
    );
    let expiresAt = moment().add(refreshTokenExpirationInDays, "days");

    await Token.create({
      type: tokenTypes.refresh,
      value: refreshToken,
      expiresAt,
      user: userId,
    });
    return { token: refreshToken, expiresAt };
  }
}
export const tokenService = new TokenService();
