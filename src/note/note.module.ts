import { Module } from '@nestjs/common';
import { AuthenticationModule } from '~/user/authentication/authentication.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [AuthenticationModule],
  providers: [NoteService],
  controllers: [NoteController],
  exports: [NoteService]
})
export class NoteModule { }
