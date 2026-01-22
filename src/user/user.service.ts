import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async findByName(name: string) {
        return await this.prisma.user.findUnique({ where: { name } })
    }

}
