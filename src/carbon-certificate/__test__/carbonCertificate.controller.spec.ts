import { CarbonCertificateController } from "../carbonCertificate.controller";
import { CarbonCertificateService } from "../carbonCertificate.service";
import { Test } from "@nestjs/testing";
import { CARBON_CERTIFICATE_SERVICE } from "../ioc";
import { mockCarbonCertificateService } from "../../testing/carbon-certificate/carbonCertificate.service.mock";
import {
    mockAvailableCarbonCertificate,
    mockOwnedCarbonCertificate,
    mockTransferredCarbonCertificate
} from "../../testing/carbon-certificate/data/mockCertificateData";

describe("Carbon Certificates Controller", () => {
    let carbonCertificateController: CarbonCertificateController;
    let carbonCertificateService: CarbonCertificateService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CarbonCertificateController],
            providers: [
                {
                    provide: CARBON_CERTIFICATE_SERVICE,
                    useFactory: mockCarbonCertificateService
                }
            ]
        }).compile();

        carbonCertificateController = module.get(CarbonCertificateController);
        carbonCertificateService = module.get(CARBON_CERTIFICATE_SERVICE);
    });

    it("should return list of available certificates", async () => {
        const getSpy = jest
            .spyOn(carbonCertificateService, "getAvailableCarbonCertificates")
            .mockResolvedValueOnce([mockAvailableCarbonCertificate]);

        const result = await carbonCertificateController.getAvailableCarbonCertificates({ page: 1, limit: 1 });

        expect(result).toMatchObject([mockAvailableCarbonCertificate]);
        expect(getSpy).toHaveBeenCalledWith({ page: 1, limit: 1 });
    });

    it("should return list of owned certificates by current user", async () => {
        const mockOwnerId = "ownerId";
        const getSpy = jest
            .spyOn(carbonCertificateService, "getOwnedCarbonCertificatesByUser")
            .mockResolvedValueOnce([mockOwnedCarbonCertificate]);

        const result = await carbonCertificateController.getOwnedCarbonCertificatesByUser(mockOwnerId);

        expect(result).toMatchObject([mockOwnedCarbonCertificate]);
        expect(getSpy).toHaveBeenCalledWith(mockOwnerId);
    });

    it("should transfer certificate owned by current user to other existing user", async () => {
        const mockCertificateId = "certificate_id";
        const userId = "user_id";

        const transferSpy = jest
            .spyOn(carbonCertificateService, "transferCarbonCertificate")
            .mockResolvedValueOnce(mockTransferredCarbonCertificate);

        const result = await carbonCertificateController.transferCertificateToUser(mockCertificateId, userId);

        expect(result).toBe(mockTransferredCarbonCertificate);
        expect(transferSpy).toHaveBeenCalledWith(mockCertificateId, userId);
    });
});
