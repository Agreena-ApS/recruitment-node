import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { USER_SERVICE } from "../users/ioc";
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_SERVICE)
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.getUserByEmail(email);
        const isValid = await bcrypt.compare(password, user.password);

        if (!user) {
            throw new NotFoundException(`User with email: ${email} not found`);
        }

        if (!isValid) {
            throw new BadRequestException("Incorrect user email or password");
        }

        return {
            access_token: this.jwtService.sign(
                { oid: user.id, ...user },
                { secret: process.env.JWT_SECRET, expiresIn: "30m" }
            )
        };
    }
}
