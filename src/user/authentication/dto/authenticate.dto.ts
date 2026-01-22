import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 0, minUppercase: 0 })
    password: string;
}

export class CreateUserResponse { }

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LoginUserResponse { }

