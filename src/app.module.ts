import { Module } from "@nestjs/common";
import { UserController } from "./modules/user/user.controller";
import { UserService } from "./modules/user/user.service";
import { PrismaService } from "./modules/prisma/prisma.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class AppModule {}
