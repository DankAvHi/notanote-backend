import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from './authentication/authentication.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getUser(@Param('id') id: string) {
        console.log(id)
        return await this.userService.findById(id)
    }

}
