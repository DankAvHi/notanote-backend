import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticationService } from './authentication/authentication.service';
import { UnauthenticatedException } from './authentication/exception/unauthenticated.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthenticationService))
    private readonly authenticationService: AuthenticationService,
    private prisma: PrismaService,
  ) {}

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

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.findById(id);

    if (user === null) {
      throw new UnauthenticatedException();
    }

    if (!(await compare(oldPassword, user.password))) {
      throw new UnauthenticatedException();
    }

    const hashedPassword = hashSync(newPassword, genSaltSync());

    const newUser = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    const accessToken =
      await this.authenticationService.getAccesToken(newUser);

    return { accessToken };
  }
}
