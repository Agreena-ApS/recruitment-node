import { Test } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { AUTH_SERVICE } from "../ioc";

describe("Auth Controller", () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AUTH_SERVICE,
                    useFactory: () => ({
                        login: jest.fn()
                    })
                }
            ]
        }).compile();

        authController = module.get(AuthController);
        authService = module.get(AUTH_SERVICE);
    });

    it("should return access token on login", async () => {
        const email = "user@test.com";
        const password = "password";
        const mockToken = { access_token: "token" };

        const loginSpy = jest.spyOn(authService, "login").mockResolvedValueOnce(mockToken);
        const result = await authController.login({ email, password });

        expect(result).toBe(mockToken);
        expect(loginSpy).toHaveBeenCalledWith(email, password);
    });
});
