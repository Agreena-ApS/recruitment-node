import faker from "@faker-js/faker";
import * as bcrypt from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import { UserEntity } from "../users/entity/user.entity";

faker.seed(124);
const NUMBER_OF_USERS = 5;
const salt = 10;

export class ImportUsers1650112967415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const users: UserEntity[] = [];

        for (let i = 0; i < NUMBER_OF_USERS; i++) {
            users.push(
                new UserEntity({
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    email: faker.internet.email().toLowerCase(),
                    password: await bcrypt.hash(faker.internet.password(), salt)
                })
            );
        }

        await queryRunner.manager.save(users);
        await queryRunner.manager.save(
            new UserEntity({
                name: "admin",
                email: "admin@test.com",
                password: await bcrypt.hash("Initial01", salt)
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.remove(UserEntity);
    }
}
