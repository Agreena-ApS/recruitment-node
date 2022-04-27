import jwt from "jsonwebtoken";
import moment from "moment";
import status from "../enums/status";
import errors from "../enums/errors";
import config from "config";
import { Request, Response } from "express";
import returnResponse from "../utils/responseFactory";

function generateAccessToken(user: any) {
  try {
    const { privateKey, issuer, expirationInMinutes } =
      config.get("jwtSettings");
    const expiresAt = moment().add(expirationInMinutes, "minutes").unix();
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        userType: user.type,
        iat: moment().unix(),
        expAt: expiresAt,
        issuer: issuer,
      },
      privateKey
    );
    return {
      token,
      expiresAt,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(token: string) {
  try {
    let decoded: any = jwt.verify(token, config.get("jwtSettings.privateKey"), {
      ignoreExpiration: true,
    });
    if (decoded.expAt < moment().unix()) {
      return {
        verified: false,
        error: [errors.TOKEN_EXPIRED],
        status: status.TOKEN_EXPIRED,
      };
    }
    return {
      verified: true,
      data: decoded,
    };
  } catch (error) {
    return {
      verified: false,
      error: [errors.INVALID_TOKEN],
      status: status.INVALID_TOKEN,
    };
  }
}

function authenticateUser(req: Request, res: Response, next: any) {
  let token = req.header("Authorization");
  if (!token) {
    returnResponse(res, status.UNAUTHORIZED, null, errors.UNAUTHORIZED, null);
  } else {
    token = token.split(" ")[1];
    let result = verifyToken(token);
    if (!result.verified) {
      returnResponse(res, result.status, null, result.error, null);
    } else {
      req.user = result.data;
      req.authenticated = true;
      next();
    }
  }
}

function checkToken(req: any, res: Response, next: any) {
  authenticateUser(req, res, next);
}

export { generateAccessToken, verifyToken, checkToken };
