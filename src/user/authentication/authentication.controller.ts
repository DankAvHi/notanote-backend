import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from "@nestjs/common";
import * as express from "express";
import { AuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";
import { LoginUserDto } from "./dto/authenticate.dto";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @HttpCode(200)
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

    @Get("verify")
    @UseGuards(AuthGuard)
    verify() {
        return { result: true };
    }
}
