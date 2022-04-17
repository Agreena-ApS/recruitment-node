/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class DbInit1650107488470 implements MigrationInterface {
    name = "DbInit1650107488470";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."CARBON_CERTIFICATES_status_enum" AS ENUM('available', 'owned', 'transferred')`
        );
        await queryRunner.query(
            `CREATE TABLE "CARBON_CERTIFICATES" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "status" "public"."CARBON_CERTIFICATES_status_enum" NOT NULL DEFAULT 'available', "ownerId" uuid, CONSTRAINT "PK_801460b4eebc9362799daf4b73c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "USERS" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "CARBON_CERTIFICATES" ADD CONSTRAINT "FK_bcfb7bfc649320115dee28bc876" FOREIGN KEY ("ownerId") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CARBON_CERTIFICATES" DROP CONSTRAINT "FK_bcfb7bfc649320115dee28bc876"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`DROP TABLE "CARBON_CERTIFICATES"`);
        await queryRunner.query(`DROP TYPE "public"."CARBON_CERTIFICATES_status_enum"`);
    }
}
