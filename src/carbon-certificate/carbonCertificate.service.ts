import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { USER_SERVICE } from "../users/ioc";
import { UserService } from "../users/user.service";
import { CarbonCertificateEntity } from "./entity/carbonCertificate.entity";
import { CarbonCertificateQueryParams } from "./dto/carbonCertificateQueryParams";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "./interface/carbonCertificateStatusType";

@Injectable()
export class CarbonCertificateService {
    constructor(
        @InjectRepository(CarbonCertificateEntity)
        private readonly carbonCertificateRepository: Repository<CarbonCertificateEntity>,
        @Inject(USER_SERVICE)
        private readonly userService: UserService
    ) {}

    public async getAvailableCarbonCertificates(
        query: CarbonCertificateQueryParams
    ): Promise<CarbonCertificateEntity[]> {
        const page = query.page ? query.page : 1;
        const skippedItems = (page - 1) * query.limit;

        return this.carbonCertificateRepository.find({
            where: {
                status: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE
            },
            skip: skippedItems,
            take: query.limit,
            loadRelationIds: true
        });
    }

    public async getOwnedCarbonCertificatesByUser(ownerId: string): Promise<CarbonCertificateEntity[]> {
        const owner = await this.userService.getUserById(ownerId);

        if (!owner) {
            throw new NotFoundException(`Owner ${ownerId} not found`);
        }

        return this.carbonCertificateRepository.find({
            where: {
                status: CARBON_CERTIFICATE_STATUS_TYPE.OWNED,
                owner: ownerId
            },
            loadRelationIds: true
        });
    }

    public async transferCarbonCertificate(certificateId: string, userId: string): Promise<CarbonCertificateEntity> {
        const [user, certificate] = await Promise.all([
            this.userService.getUserById(userId),
            this.carbonCertificateRepository.findOne(certificateId)
        ]);

        if (!user) {
            throw new NotFoundException(`User ${userId} not found`);
        }

        if (!certificate) {
            throw new NotFoundException(`Certificate ${certificateId} not found`);
        }

        if (certificate.status === CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE) {
            throw new BadRequestException("Only owned certificate can be transferred");
        }

        certificate.owner = user.id;
        certificate.status = CARBON_CERTIFICATE_STATUS_TYPE.TRANSFERRED;
        return this.carbonCertificateRepository.save(certificate);
    }
}
