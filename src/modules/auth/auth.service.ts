import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { User } from "../user/entities/user.entity";
import { UserPayload } from "./models/UserPayload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./models/UserToken";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValidation = await bcrypt.compare(password, user.password);
            if (isPasswordValidation) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }
        throw new HttpException("email ou senha inválido!", HttpStatus.BAD_REQUEST);
    }

    login(user: User): UserToken {
        // Transforma o user em um JWT

        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        };
    }
}
