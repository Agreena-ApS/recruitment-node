import * as mongoose from "mongoose";
import { Model } from "mongoose";
type CertificateType = CertificateModel & mongoose.Document;
export interface CertificateModel {
  country: string;
  status: string;
  owner: mongoose.Types.ObjectId;
}
const CertificateSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  status: {
    type: String,
    default: "available"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    autopopulate: { select: "_id username email", maxDepth: 1 },
  },
});
CertificateSchema.set("toJSON", {
  virtuals: true,
  getters: true,
});
const Certificate: Model<CertificateType> = mongoose.model<CertificateType>(
  "certificates",
  CertificateSchema,
  "certificates"
);
export default Certificate;
