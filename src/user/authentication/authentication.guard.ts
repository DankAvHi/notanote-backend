import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import * as express from 'express';
import { AuthenticationService } from './authentication.service'; // проверь путь

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<express.Request>();
        const response = context.switchToHttp().getResponse<express.Response>();

        const cookies = request.cookies as Record<string, string | undefined>;
        const token = cookies?.['access_token'];

        if (!token) {
            response.cookie('access_token', '', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 0,
            });
            throw new ForbiddenException('Not logged in');
        }

        try {
            const payload = await this.authService.verify(token);

            request['user'] = payload;

            return true;
        } catch {
            response.cookie('access_token', '', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 0,
            });
            throw new ForbiddenException(`Error when verify logged session`);
        }
    }
}