import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { CurrentUser } from "./modules/auth/decorators/current-user.decorator";
import { User } from "./modules/user/entities/user.entity";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("me")
    getHello(@CurrentUser() user: User) {
        return this.appService.getHello(user);
    }
}
