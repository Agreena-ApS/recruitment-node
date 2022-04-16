import { MigrationInterface, QueryRunner } from "typeorm";
import faker from "@faker-js/faker";
import { CarbonCertificateEntity } from "../carbon-certificate/entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../carbon-certificate/interface/carbonCertificateStatusType";

faker.seed(124);
const NUMBER_OF_CERTIFICATES = 100;

export class ImportCertificates1650108524717 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const certificates: CarbonCertificateEntity[] = [];

        for (let i = 1; i < NUMBER_OF_CERTIFICATES; i++) {
            certificates.push(
                new CarbonCertificateEntity({
                    country: faker.address.country(),
                    status: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE,
                    owner: null
                })
            );
        }

        await queryRunner.manager.save(certificates);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.remove(CarbonCertificateEntity);
    }
}
