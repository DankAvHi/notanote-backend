import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/user/authentication/authentication.guard';
import type { UserPayload } from '~/user/authentication/types';
import { CurrentUser } from '~/user/user.decorator';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@UseGuards(AuthGuard)
@Controller('note')
export class NoteController {
    constructor(private service: NoteService) { }

    @Get()
    async getNotes(@CurrentUser() user: UserPayload) {
        return this.service.getUserNotes(user.id)
    }

    @Get(":id")
    async getNote(@CurrentUser() user: UserPayload, @Param('id') id: string) {
        return this.service.getUserNote(user.id, id)
    }

    @Post()
    createNote(@CurrentUser() user: UserPayload, @Body() body: CreateNoteDto,) {
        return this.service.createNote(body, user.id)
    }

    @Patch()
    updateNote(@CurrentUser() user: UserPayload, @Body() body: UpdateNoteDto) {
        return this.service.updateUserNote(user.id, body)
    }

    @Delete(":id")
    deleteNote(@CurrentUser() user: UserPayload, @Param('id') id: string) {
        return this.service.deleteUserNote(user.id, id)
    }

}
