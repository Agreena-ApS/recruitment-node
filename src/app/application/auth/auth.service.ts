import Service from "../../helper/service/index";
import argonService from "../../security/argon.service";
import User from "../user/user.model";
import Token from "../token/token.model";
import messages from "../../enums/messages";
import nouns from "../../enums/nouns";
import status from "../../enums/status";
import errors from "../../enums/errors";
import moment from "moment";
import { tokenService } from "../token/token.service";

import userTypes from "../../enums/userTypes.enum";

class AuthService extends Service {
  async signUp(userData: any) {
    try {
      const password = await argonService.generateHashPassword(
        userData.password
      );
      delete userData.password;

      //email should be saved in unverifiedEmail but because I didn't develop email service for this project I ignore this issue and save email without verification
      //and also I ignore verification keys
      const user = await User.create({
        ...userData,
        type: userTypes.client,
        password,
        "security.verificationEmailRequestedOn": moment(),
      });
      return user.toJSON();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signIn(credentials: any, userType: any) {
    try {
      let { username, password } = credentials;
      username = username.toLowerCase();
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
        isActive: true,
        email: { $nin: [""], $exists: true },
        type: userType,
      });
      //check if username or email exist
      if (!user) {
        return {
          status: status.NOT_FOUND,
          error: errors.USERNAME_OR_PASSWORD_NOT_VALID,
        };
      }
      // check if password is correct for the given username
      if (!(await argonService.comparePassword(user.password, password))) {
        user.security.failedSignInAttempts =
          user.security.failedSignInAttempts + 1;
        if (user.security.failedSignInAttempts >= 7) {
          user.security.canNotSignInUntil = moment().add(1, "hours");
        }
        await user.save();
        return {
          status: status.NOT_FOUND,
          error: errors.USERNAME_OR_PASSWORD_NOT_VALID,
        };
      }
      //check if user is not blocked by security policies
      if (
        user.security.canNotSignInUntil &&
        moment(user.security.canNotSignInUntil).isAfter(moment())
      ) {
        return {
          status: status.FORBIDDEN,
          error: errors.CAN_NOT_SIGN_IN_UNTIL_SECONDS(
            moment(user.security.canNotSignInUntil)
              .diff(moment(), "seconds")
              .toString()
          ),
        };
      }
      const accessToken = user.generateAccessToken();
      const refreshToken = await tokenService.generateRefreshTokenForUser(
        user._id
      );
      user.security.lastSignInDate = new Date();
      user.security.canNotSignInUntil = null;
      user.security.failedSignInAttempts = 0;
      user.security.requireSignIn = false;
      await user.save();

      return {
        status: status.OK,
        message: messages.SIGNED_IN_SUCCESSFULLY,
        data: {
          accessToken: accessToken.token,
          accessTokenExpiresAt: moment
            .unix(accessToken.expiresAt)
            .diff(moment(), "seconds"),
          refreshToken: refreshToken.token,
          refreshTokenExpiresAt: moment(refreshToken.expiresAt).diff(
            moment(),
            "seconds"
          ),
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async refreshTheAccessToken(refreshToken: any) {
    try {
      let token = await Token.findOne({
        value: refreshToken,
        type: "refresh",
      });
      if (!token) {
        return { status: status.INVALID_TOKEN, error: errors.INVALID_TOKEN };
      }
      let user = await User.findById(token.user);
      if (
        moment(token.expiresAt).isBefore(moment()) ||
        user?.security.requireSignIn
      ) {
        return {
          status: status.SIGN_IN_REQUIRED,
          error: errors.SIGN_IN_REQUIRED,
        };
      }
      if (!user?.isActive) {
        return { status: status.FORBIDDEN, error: errors.FORBIDDEN };
      }
      const accessToken = user.generateAccessToken();

      return {
        status: status.OK,
        data: {
          accessToken: accessToken.token,
          accessTokenExpiresAt: moment
            .unix(accessToken.expiresAt)
            .diff(moment(), "seconds"),
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async revokeRefreshToken(userIds: any) : Promise<any> {
    try {
      let result = await Token.deleteMany({ user: { $in: userIds } });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async changePassword(userId: any, password: any, newPassword: any) {
    try {
      let user = await User.findById(userId);
      if (
        !user ||
        !(await argonService.comparePassword(user.password, password))
      ) {
        return false;
      }
      let hashedPassword = await argonService.generateHashPassword(newPassword);
      user.password = hashedPassword;
      await this.revokeRefreshToken(user._id);
      await user.save();
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
