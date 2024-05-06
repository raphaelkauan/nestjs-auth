import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    async getHello(text) {
        text = "Olá, mundo!";
        return text;
    }
}
