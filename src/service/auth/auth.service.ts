import { Injectable } from '@nestjs/common';
import { UserInfo, UserLoginSuccess } from 'src/dto/user.interface';
import { UserLogin, UserRegister } from 'src/dto/user.request.interface';

@Injectable()
export class AuthService {
  constructor() {}
  async register(payload: UserRegister): Promise<UserInfo> {
    return {
      id: 1,
      username: 'string',
      role: [],
      fullname: 'string',
      age: 10,
    };
  }

  async login(payload: UserLogin): Promise<UserLoginSuccess> {
    return {
      id: 1,
      refreshToken: '',
      accessToken: '',
      username: '',
      role: [],
    };
  }
}
