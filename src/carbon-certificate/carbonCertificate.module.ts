import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { CarbonCertificateController } from "./carbonCertificate.controller";
import { CarbonCertificateService } from "./carbonCertificate.service";
import { CarbonCertificateEntity } from "./entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_SERVICE } from "./ioc";

@Module({
    imports: [TypeOrmModule.forFeature([CarbonCertificateEntity]), UserModule],
    controllers: [CarbonCertificateController],
    providers: [
        {
            provide: CARBON_CERTIFICATE_SERVICE,
            useClass: CarbonCertificateService
        }
    ],
    exports: [
        {
            provide: CARBON_CERTIFICATE_SERVICE,
            useClass: CarbonCertificateService
        }
    ]
})
export class CarbonCertificateModule {}
