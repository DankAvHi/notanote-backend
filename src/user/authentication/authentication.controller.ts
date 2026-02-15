import { Body, Controller, Delete, Get, HttpCode, Post, Res, UseGuards } from "@nestjs/common";
import * as express from "express";
import { CurrentUser } from "../user.decorator";
import { AuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto, LoginUserDto } from "./dto/authenticate.dto";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post("login")
    async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: express.Response): Promise<void> {
        const { accessToken } = await this.authenticationService.login(body);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

    }

    @Post("register")
    async register(@Body() body: CreateUserDto, @Res({ passthrough: true }) res: express.Response): Promise<void> {
        const { accessToken } = await this.authenticationService.register(body);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

    }

    @HttpCode(200)
    @Delete("/")
    signOut(@Res({ passthrough: true }) res: express.Response): void {
        res.cookie('access_token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 0,
        });
    }

    @Get("verify")
    @UseGuards(AuthGuard)
    verify(@CurrentUser() user: { id: string, name: string }): { id: string, name: string } {
        return user;
    }
}
