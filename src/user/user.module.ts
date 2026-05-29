import { forwardRef, Module } from '@nestjs/common';
import { NoteModule } from '~/note/note.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    forwardRef(() => NoteModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
