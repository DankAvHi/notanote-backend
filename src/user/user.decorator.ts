import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as express from 'express';
import { UserPayload } from './authentication/types';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserPayload | undefined => {
        const request = ctx.switchToHttp().getRequest<express.Request>();

        return (request as unknown as { user: UserPayload }).user as UserPayload | undefined;
    },
);