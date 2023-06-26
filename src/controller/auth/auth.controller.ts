import { Body, Controller, Post, Headers, HttpCode } from '@nestjs/common';
import { UserInfoDto, UserLoginSuccess } from 'src/dto/user.interface';
import { UserLogin, UserRegister } from 'src/dto/user.request.interface';
import { AbstractResponse } from 'src/response/abstract-response.interface';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() payload: UserRegister,
  ): Promise<AbstractResponse<UserInfoDto>> {
    let userInfo = await this.authService.register(payload);
    return {
      data: userInfo,
    };
  }

  @Post('login')
  async login(
    @Body() payload: UserLogin,
  ): Promise<AbstractResponse<UserLoginSuccess>> {
    let refreshAccessToken = await this.authService.login(payload);
    return {
      data: refreshAccessToken,
    };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Headers('Authorization') refreshToken: string) {
    await this.authService.logout({ refreshToken });
  }
}
