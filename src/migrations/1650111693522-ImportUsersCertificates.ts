/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MigrationInterface, QueryRunner } from "typeorm";
import faker from "@faker-js/faker";
import { CarbonCertificateEntity } from "../carbon-certificate/entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../carbon-certificate/interface/carbonCertificateStatusType";
import { UserEntity } from "../users/entity/user.entity";
import * as bcrypt from "bcrypt";

faker.seed(124);
const NUMBER_OF_USERS = 5;
const salt = 10;

export class ImportUsersCertificates1650111693522 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const certificates = await queryRunner.manager.find(CarbonCertificateEntity, {
            take: 5
        });
        const users: UserEntity[] = [];

        for (let i = 0; i < NUMBER_OF_USERS; i++) {
            const cert = certificates[i];
            await queryRunner.manager.update(
                CarbonCertificateEntity,
                { id: cert.id },
                { status: CARBON_CERTIFICATE_STATUS_TYPE.OWNED }
            );

            users.push(
                new UserEntity({
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    email: faker.internet.email().toLowerCase(),
                    password: await bcrypt.hash(faker.internet.password(), salt),
                    certificates: [cert]
                })
            );
        }

        await queryRunner.manager.save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.remove(UserEntity);
    }
}
