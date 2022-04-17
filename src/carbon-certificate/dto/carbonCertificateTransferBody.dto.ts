import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import * as uuid from "uuid";

export class CarbonCertificateTransferBody {
    @ApiProperty({
        example: uuid.v4()
    })
    @IsUUID("4")
    @IsNotEmpty()
    certificateId: string;

    @ApiProperty({
        example: uuid.v4()
    })
    @IsUUID("4")
    @IsNotEmpty()
    ownerId: string;

    @ApiProperty({
        example: uuid.v4()
    })
    @IsUUID("4")
    @IsNotEmpty()
    userId: string;
}
