import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRegisterRequestDto } from './dtos/user-register-request.dto';
import { UserLoginResponseDto } from './dtos/user-login-response.dto';
import { UserLoginRequestDto } from './dtos/user-login-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    public async register(@Body() body: UserRegisterRequestDto): Promise<UserLoginResponseDto> {
        const { email, password, name } = body

        const { user, token } = await this.authService.register({ email, password, name })

        return { user, token }
    }

    @Get('login')
    public async login(@Body() body: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        const { email, password } = body
        const { user, token } = await this.authService.validateLogin({ email, password })

        return { user, token }
    }
}
