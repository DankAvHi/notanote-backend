import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AuthenticationModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
