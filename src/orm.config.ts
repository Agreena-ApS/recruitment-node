import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ImportUsers1650112967415 } from "./migrations/1650112967415-ImportUsers";

export const ormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: false,
    cli: {
        migrationsDir: "src/migrations"
    },
    migrations: [ImportUsers1650112967415]
};
