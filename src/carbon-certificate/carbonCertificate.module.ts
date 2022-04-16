import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonCertificateService } from "./carbonCertificate.service";
import { CarbonCertificateEntity } from "./entity/carbonCertificate.entity";
import { CARBON_CERTIFICATE_SERVICE } from "./ioc";

@Module({
    imports: [TypeOrmModule.forFeature([CarbonCertificateEntity])],
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
