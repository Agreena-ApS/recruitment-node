import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AUTH_SERVICE } from "./ioc";
import { JwtStrategy } from "./strategies/jwtStrategy";

@Module({
    imports: [UserModule, PassportModule],
    controllers: [AuthController],
    providers: [
        {
            provide: AUTH_SERVICE,
            useClass: AuthService
        },
        JwtStrategy
    ],
    exports: [
        {
            provide: AUTH_SERVICE,
            useClass: AuthService
        }
    ]
})
export class AuthModule {}
