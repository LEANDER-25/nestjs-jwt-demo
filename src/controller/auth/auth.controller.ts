import { Body, Controller, Post } from '@nestjs/common';
import { UserInfo } from 'src/dto/user.interface';
import { UserRegister } from 'src/dto/user.request.interface';
import { AbstractResponse } from 'src/response/abstract-response.interface';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() payload: UserRegister): Promise<AbstractResponse<UserInfo>> {
        let userInfo = await this.authService.register(payload)
        return {
            data: userInfo
        }
    }

}
