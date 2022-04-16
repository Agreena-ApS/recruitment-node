import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarbonCertificateEntity } from "../../carbon-certificate/entity/carbonCertificate.entity";

@Entity("USERS")
export class UserEntity {
    constructor(part: Partial<UserEntity>) {
        Object.assign(this, part);
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    password: string;

    @OneToMany(() => CarbonCertificateEntity, (certificate) => certificate.owner)
    certificates: CarbonCertificateEntity[];
}
