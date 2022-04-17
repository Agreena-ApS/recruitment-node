import { Controller, Get, HttpStatus, Inject, Param, ParseUUIDPipe, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarbonCertificateService } from "./carbonCertificate.service";
import { CarbonCertificateQueryParams } from "./dto/carbonCertificateQueryParams";
import { CarbonCertificateEntity } from "./entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_SERVICE } from "./ioc";

@Controller("carbon-certificates")
@ApiTags("Carbon Certificates")
export class CarbonCertificateController {
    constructor(
        @Inject(CARBON_CERTIFICATE_SERVICE)
        private readonly carbonCertificateService: CarbonCertificateService
    ) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CarbonCertificateEntity],
        description: "Available carbon certificates"
    })
    @ApiOperation({ summary: "Get list of available carbon certificates" })
    public async getAvailableCarbonCertificates(
        @Query() query: CarbonCertificateQueryParams
    ): Promise<CarbonCertificateEntity[]> {
        return this.carbonCertificateService.getAvailableCarbonCertificates(query);
    }

    @Get(":ownerId/ownedByUser")
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CarbonCertificateEntity],
        description: "Carbon certificates owned by current user"
    })
    @ApiOperation({ summary: "Get list of owned carbon certificates" })
    public async getOwnedCarbonCertificatesByUser(
        @Param("ownerId", new ParseUUIDPipe({ version: "4" })) ownerId: string
    ): Promise<CarbonCertificateEntity[]> {
        return this.carbonCertificateService.getOwnedCarbonCertificatesByUser(ownerId);
    }

    @Put(":certificateId/owner/:ownerId/transfer")
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CarbonCertificateEntity],
        description: "Transferred carbon certificate"
    })
    @ApiOperation({ summary: "Transfer carbon certificate to the another existing user" })
    public async transferCertificateToUser(
        @Param("certificateId", new ParseUUIDPipe({ version: "4" })) certificateId: string,
        @Param("userId", new ParseUUIDPipe({ version: "4" })) userId: string
    ): Promise<CarbonCertificateEntity> {
        return this.carbonCertificateService.transferCarbonCertificate(certificateId, userId);
    }
}
