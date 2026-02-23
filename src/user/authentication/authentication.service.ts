import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare, genSaltSync, hashSync } from "bcryptjs";
import { UserService } from "../user.service";
import { CreateUserDto, LoginUserDto } from "./dto/authenticate.dto";
import { UnauthenticatedException, UserExistException, } from "./exception/unauthenticated.exception";
import { UserPayload } from "./types";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginUserDto): Promise<{
        accessToken: string;
    }> {
        const user = await this.usersService.findByName(dto.name);

        if (user === null) {
            throw new UnauthenticatedException();
        }

        if (!(await compare(dto.password, user.password))) {
            throw new UnauthenticatedException();
        }

        const accessToken = await this.getAccesToken(user)

        return { accessToken };
    }

    async register(dto: CreateUserDto): Promise<{
        accessToken: string;
    }> {
        const existedUser = await this.usersService.findByName(dto.name);

        if (existedUser !== null) {
            throw new UserExistException();
        }

        const hashedPassword = hashSync(dto.password, genSaltSync())

        const newUser = await this.usersService.create(dto.name, hashedPassword)

        const accessToken = await this.getAccesToken(newUser)

        return { accessToken };
    }

    async getAccesToken(user: User): Promise<string> {
        const accessToken = await this.jwtService.signAsync(
            {
                name: user.name,
                id: user.id,
            },
            {
                expiresIn: 2592000,
                secret: "76a0819fb691a533208fd8453e2a42b4248e2ced1c4d339f550c8f59425b9af2",
            },
        );

        return accessToken;
    }

    async verify(token: string) {
        try {
            const tokenData = await this.jwtService.verifyAsync<UserPayload>(token, {
                secret: "76a0819fb691a533208fd8453e2a42b4248e2ced1c4d339f550c8f59425b9af2",
            });

            const user = await this.usersService.findById(tokenData.id)

            if (user) return user
            else throw new UnauthenticatedException();
        } catch {
            throw new UnauthenticatedException();
        }
    }
}
