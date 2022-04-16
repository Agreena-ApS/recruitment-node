import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../interface/carbonCertificateStatusType";

@Entity("CARBON_CERTIFICATES")
export class CarbonCertificateEntity {
    constructor(part: Partial<CarbonCertificateEntity>) {
        Object.assign(this, part);
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    country: string;

    @Column("enum", {
        nullable: false,
        enum: CARBON_CERTIFICATE_STATUS_TYPE,
        default: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE
    })
    status: CARBON_CERTIFICATE_STATUS_TYPE;

    @ManyToOne(() => UserEntity, (user) => user.certificates)
    owner: UserEntity[];
}
