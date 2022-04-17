import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class CarbonCertificateQueryParams {
    @ApiPropertyOptional({
        example: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({
        example: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;
}
