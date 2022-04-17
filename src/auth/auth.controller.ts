import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AccessTokenPresentation } from "./dto/accessTokenPresentation.dto";
import { LoginBody } from "./dto/loginBody.dto";
import { AUTH_SERVICE } from "./ioc";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: AuthService
    ) {}

    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiResponse({ status: HttpStatus.CREATED, type: AccessTokenPresentation })
    async login(@Body() body: LoginBody): Promise<AccessTokenPresentation> {
        return this.authService.login(body.email, body.password);
    }
}
