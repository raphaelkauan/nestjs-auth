import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../../database/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const data = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        };

        const email = await this.prisma.user.findFirst({
            where: {
                email: createUserDto.email,
            },
        });

        if (email) {
            throw new HttpException("esse email já existe!", HttpStatus.CONFLICT);
        }

        try {
            await this.prisma.user.create({ data });
        } catch (error) {
            throw new error("erro ao criar um usuário!");
        }

        return {
            ...createUserDto,
            password: undefined,
        };
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    }

    // findAll() {
    //     return `This action returns all user`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
