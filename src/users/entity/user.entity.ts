import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("USERS")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    password: string;
}
