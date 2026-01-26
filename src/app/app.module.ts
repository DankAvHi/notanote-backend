import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthenticationModule } from '../user/authentication/authentication.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'uploads'),
    serveRoot: '/uploads',
  }), PrismaModule, UserModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
