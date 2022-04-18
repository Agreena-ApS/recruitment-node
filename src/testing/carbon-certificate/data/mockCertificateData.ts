import { CarbonCertificateEntity } from "../../../carbon-certificate/entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../../../carbon-certificate/interface/carbonCertificateStatusType";

export const mockAvailableCarbonCertificate: CarbonCertificateEntity = {
    id: "certificate_id",
    country: "England",
    owner: null,
    status: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE
};

export const mockOwnedCarbonCertificate: CarbonCertificateEntity = {
    id: "certificate_id",
    country: "England",
    owner: "ownerId",
    status: CARBON_CERTIFICATE_STATUS_TYPE.OWNED
};

export const mockTransferredCarbonCertificate: CarbonCertificateEntity = {
    id: "certificate_id",
    country: "England",
    owner: "userId",
    status: CARBON_CERTIFICATE_STATUS_TYPE.TRANSFERRED
};
