import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("user/:id")
    async getUser(@Param('id') id: string) {
        return await this.userService.findById(id)
    }

    @Get("/")
    async getUsers() {
        return await this.userService.getUsers()
    }
}
