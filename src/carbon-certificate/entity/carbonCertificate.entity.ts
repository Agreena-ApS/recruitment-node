import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { CARBON_CERTIFICATE_STATUS_TYPE } from "../interface/carbonCertificateStatusType";
import { v4 } from "uuid";

@Entity("CARBON_CERTIFICATES")
export class CarbonCertificateEntity {
    constructor(part: Partial<CarbonCertificateEntity>) {
        Object.assign(this, part);
    }

    @ApiProperty({
        example: v4()
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        example: "USA"
    })
    @Column("varchar")
    country: string;

    @ApiProperty({ enum: CARBON_CERTIFICATE_STATUS_TYPE, example: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE })
    @Column("enum", {
        nullable: false,
        enum: CARBON_CERTIFICATE_STATUS_TYPE,
        default: CARBON_CERTIFICATE_STATUS_TYPE.AVAILABLE
    })
    status: CARBON_CERTIFICATE_STATUS_TYPE;

    @ApiPropertyOptional({
        example: v4()
    })
    @ManyToOne((_) => UserEntity, (user) => user.certificates)
    owner: UserEntity["id"];
}
