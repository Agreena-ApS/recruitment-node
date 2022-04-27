import moment from "moment";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import tokenTypes from "../../enums/tokenTypes";

type TokenType = TokenModel & mongoose.Document;
export interface TokenModel {
  type: string;
  value: string;
  expiresAt: Date;
  user: mongoose.Schema.Types.ObjectId;
}
const TokenSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(tokenTypes),
    },
    value: {
      type: String,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      default: () => moment().add(12, "months").toDate(), // default 12 month later
      expires: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      autopopulate: true,
    },
  },
  { id: false }
);
const Token: Model<TokenType> = mongoose.model<TokenType>(
  "tokens",
  TokenSchema,
  "tokens"
);
export default Token;
