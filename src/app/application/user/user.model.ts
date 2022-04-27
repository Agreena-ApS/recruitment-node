import * as mongoose from "mongoose";
import { Model } from "mongoose";
import {generateAccessToken} from "../../security/jwt.service";
type UserType = UserModel & mongoose.Document;
export interface UserModel {
  type: {
    type: string;
  };
  username: string;

  email: string;

  unverifiedEmail: string;

  phoneNumber: string;

  unverifiedPhoneNumber: string;

  isActive: boolean;

  adminComment: String;

  password: string;

  signedUpOn: Date;

  security: {
    verificationEmailRequestedOn: Date;

    canNotSignInUntil: any;

    lastSignInDate: Date;

    lastIpAddress: string;

    failedSignInAttempts: number;

    isSystemAccount: boolean;

    isTwoStepAuthActive: boolean;

    requireSignIn: boolean;
  };

  keys: {
    emailVerificationCode: string;

    emailVerificationCodeExpiresAt: Date;

    phoneVerificationCode: string;

    phoneVerificationCodeExpiresAt: Date;

    passwordResetCode: string;

    passwordResetCodeExpiresAt: Date;
  };
  protected: boolean;
  generateAccessToken(): any
}
const UserSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  username: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
  },
  unverifiedEmail: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    index: true,
  },
  unverifiedPhoneNumber: {
    type: String,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  adminComment: {
    type: String,
  },
  password: {
    type: String,
    hideJSON: true,
  },
  signedUpOn: {
    type: Date,
    default: Date.now,
  },
  // I had no time for developing roles and permissions
  // roles: [String]
  security: {
    verificationEmailRequestedOn: {
      type: Date,
      hideJSON: true,
    },
    canNotSignInUntil: Date,

    lastSignInDate: {
      type: Date,
    },
    lastIpAddress: {
      type: String,
    },
    failedSignInAttempts: {
      type: Number,
      default: 0,
    },
    isSystemAccount: {
      type: Boolean,
      default: false,
      hideJSON: true,
    },
    isTwoStepAuthActive: {
      type: Boolean,
      default: false,
    },
    requireSignIn: {
      type: Boolean,
      default: false,
    },
  },

  keys: {
    emailVerificationCode: {
      type: String,
      hideJSON: true,
    },
    emailVerificationCodeExpiresAt: {
      type: Date,
      hideJSON: true,
    },
    phoneVerificationCode: {
      type: String,
      hideJSON: true,
    },
    phoneVerificationCodeExpiresAt: {
      type: Date,
      hideJSON: true,
    },

    passwordResetCode: {
      type: String,
      hideJSON: true,
    },
    passwordResetCodeExpiresAt: {
      type: Date,
      hideJSON: true,
    },
  },
  protected: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generateAccessToken = function () {
  const { _id, type, username } = this;
  return generateAccessToken({ _id, type, username });
};

UserSchema.index({ username: 1, email: 1, phoneNumber: 1 });
const User: Model<UserType> = mongoose.model<UserType>(
  "users",
  UserSchema,
  "users"
);
export default User;
