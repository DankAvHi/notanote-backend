import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserService } from "../user.service";
import { LoginUserDto } from "./dto/authenticate.dto";
import { UnauthenticatedException, } from "./exception/unauthenticated.exception";

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
        type TokenData = {
            name: string;
            id: string;
        };
        try {
            const user = await this.jwtService.verifyAsync<TokenData>(token, {
                secret: "76a0819fb691a533208fd8453e2a42b4248e2ced1c4d339f550c8f59425b9af2",
            });

            return user;
        } catch {
            throw new UnauthenticatedException();
        }
    }
}
