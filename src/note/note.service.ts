import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) { }

    async getNotes() {
        return await this.prisma.note.findMany()
    }

    async getUserNotes(authorId: string) {
        return await this.prisma.note.findMany({ where: { authorId } })
    }

    async getNote(id: string) {
        return await this.prisma.note.findUnique({ where: { id } })
    }

    async getUserNote(authorId: string, id: string) {
        return await this.prisma.note.findUnique({ where: { authorId, id } })
    }

    async createNote(dto: CreateNoteDto, authorId: string) {
        const { text } = dto

        return await this.prisma.note.create({ data: { text, authorId, isChecked: false } })
    }

    async deleteNote(id: string) {
        return await this.prisma.note.delete({ where: { id } })
    }

    async deleteUserNote(authorId: string, id: string) {
        return await this.prisma.note.delete({ where: { authorId, id } })
    }

    async updateNote(dto: UpdateNoteDto) {
        const { id, isChecked, text } = dto
        return await this.prisma.note.update({ where: { id }, data: { text, isChecked } })
    }

    async updateUserNote(authorId: string, dto: UpdateNoteDto) {
        const { id, isChecked, text } = dto
        return await this.prisma.note.update({ where: { authorId, id }, data: { text, isChecked } })
    }

}
