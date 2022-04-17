import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { CarbonCertificateModule } from "./carbon-certificate/carbonCertificate.module";
import { ormConfig } from "./orm.config";
import { UserModule } from "./users/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        {
            ...JwtModule.register({ secret: process.env.JWT_SECRET }),
            global: true
        },
        CarbonCertificateModule,
        UserModule,
        AuthModule
    ],
    exports: [JwtModule]
})
export class AppModule {}
