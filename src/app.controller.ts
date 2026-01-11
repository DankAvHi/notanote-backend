import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prisma: PrismaService) { }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('check-db')
  async checkDb() {
    const result = await this.prisma.$queryRaw`SELECT NOW()`;
    return {
      status: 'Connected to Podman PG!',
      time: result
    };
  }


}
