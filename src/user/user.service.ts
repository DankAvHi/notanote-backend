import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.user.findUnique({ where: { name } });
  }

  async create(name: string, password: string) {
    return await this.prisma.user.create({
      data: { name, password },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async patchPicture(id: string, picture: Express.Multer.File) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        image: picture.path.split('/')[1],
      },
    });
  }
}
