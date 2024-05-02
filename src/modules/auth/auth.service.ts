import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

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

    async login() {
        return "login realizado com sucesso!";
    }
}
