import { IsNotEmpty, IsString } from "class-validator";
import { User } from '../../common/generated-classes/user';


export class FindByIdDto {
    @IsString()
    @IsNotEmpty()
    id: string
}

export class FindByIdResponse implements Omit<User, 'notes'> {
    id: string;
    createdAt: Date;
    image: string;
    name: string;
    password: string;
    updatedAt: Date;
}

export class FindByNameDto {
    @IsString()
    @IsNotEmpty()
    id: string
}