import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../interface/carbonCertificateStatusType";

@Entity("CARBON_CERTIFICATES")
export class CarbonCertificateEntity {
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

    @Column("uuid", { nullable: true, default: null })
    owner: UserEntity["id"];
}
