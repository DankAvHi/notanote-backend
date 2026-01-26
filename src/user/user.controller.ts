import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from './authentication/authentication.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("user/:id")
    async getUser(@Param('id') id: string) {
        return await this.userService.findById(id)
    }

    @UseGuards(AuthGuard)
    @Get("/")
    async getUsers() {
        return await this.userService.getUsers()
    }
}
