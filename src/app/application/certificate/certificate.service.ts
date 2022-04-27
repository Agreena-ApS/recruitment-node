import * as mongoose from "mongoose";
import CertificateTypesEnum from "../../enums/certificateTypes.enum";
import Service from "../../helper/service/index";
import Certificate, { CertificateModel } from "./certificate.model";
class CertificateService extends Service {
  async create(certificateData: CertificateModel): Promise<CertificateModel> {
    try {
      return await Certificate.create({ ...certificateData });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateCertificate(
    certificateId: any,
    certificateData: any
  ): Promise<any> {
    try {
      const cert = await Certificate.findOne({ _id: certificateId });
      if (cert) {
        cert.status = cert?.status === "available" ? "owned" : "transferred";
        cert.owner = certificateData.owner;
        await cert.save()
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getCertificates(filter: any): Promise<any> {
    try {
      return await Certificate.find(filter);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getOneCertificate(certificateId: mongoose.Types.ObjectId, filter: any) {
    try {
      return await Certificate.findById(certificateId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export const certificateService = new CertificateService();
