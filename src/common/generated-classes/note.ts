import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class Note {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  text: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: String })
  authorId: string;
}
