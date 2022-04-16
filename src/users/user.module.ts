import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { USER_SERVICE } from "./ioc";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: USER_SERVICE,
            useClass: UserService
        }
    ],
    exports: [
        {
            provide: USER_SERVICE,
            useClass: UserService
        }
    ]
})
export class UserModule {}
