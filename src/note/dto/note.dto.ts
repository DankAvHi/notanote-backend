import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Note } from '../../common/generated-classes/note';

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    text!: string
}

export class CreateNoteResponse implements Omit<Note, 'author'> {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isChecked!: boolean;
    text!: string;
    authorId!: string;
}

export class UpdateNoteDto {
    @IsNotEmpty()
    @IsString()
    id!: string

    @IsNotEmpty()
    @IsString()
    text!: string

    @IsNotEmpty()
    @IsBoolean()
    isChecked!: boolean
}

export class UpdateNoteResponse implements Omit<Note, 'author'> {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isChecked!: boolean;
    text!: string;
    authorId!: string;
}
