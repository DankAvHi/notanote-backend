import { Note as _Note } from './note';
import { User as _User } from './user';

export namespace PrismaModel {
  export class Note extends _Note {}
  export class User extends _User {}

  export const extraModels = [Note, User];
}
