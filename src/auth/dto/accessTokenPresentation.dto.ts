import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenPresentation {
    @ApiProperty()
    access_token: string;
}
