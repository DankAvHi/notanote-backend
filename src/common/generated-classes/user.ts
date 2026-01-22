import { Note } from './note';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => Note })
  notes: Note[];
}
