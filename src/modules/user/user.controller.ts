import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IsPublic } from "../auth/decorators/is-public.decorator";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @IsPublic()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
