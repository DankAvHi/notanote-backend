import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { User } from "~/common/generated-classes/user";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 0, minUppercase: 0 })
    password!: string;
}

export class CreateUserResponse { }

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class LoginUserResponse { }


export class SignOutDto {

}


export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    oldPassword!: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 0, minUppercase: 0 })
    newPassword!: string
}

export class ChangePasswordResponse implements Omit<User, 'notes'> {
    id!: string;
    name!: string;
    password!: string;
    image?: string | undefined;
    createdAt!: Date;
    updatedAt!: Date;
}