import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as express from 'express';
import 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { isProduction } from '~/common/config';
import { NoteService } from '~/note/note.service';
import { AuthGuard } from './authentication/authentication.guard';
import type { UserPayload } from './authentication/types';
import { CurrentUser } from './user.decorator';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly noteService: NoteService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Delete()
  async deleteUser(
    @CurrentUser() user: UserPayload,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const _deletedNotes = await this.noteService.deleteAllUserNotes(
      user.id,
    );
    const deletedUser = await this.userService.delete(user.id);
    res.cookie('access_token', '', {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    res.cookie('is_auth', false, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return deletedUser;
  }

  @Patch('picture')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: 'uploads',
        filename(_req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${fileExtName}`,
          );
        },
      }),
    }),
  )
  async patchPicture(
    @CurrentUser() user: UserPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/(png|jpeg)',
            skipMagicNumbersValidation: true,
          }),
        ],
      }),
    )
    picture: Express.Multer.File,
  ) {
    await this.userService.patchPicture(user.id, picture);
  }
}
