import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { EnterCarRequestDto } from './dtos/enter-car-request.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('register-car')
    public async enterCarInfo(@Body() body: EnterCarRequestDto) {
        const { id, carType, carNumber } = body;

        return await this.userService.enterCarInfo({ id, carType, carNumber })
    }

    
}
