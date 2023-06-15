import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/dto/user.interface';
import { UserRegister } from 'src/dto/user.request.interface';

@Injectable()
export class AuthService {
  async register(payload: UserRegister): Promise<UserInfo> {
    return {
      id: 1,
      username: 'string',
      role: [],
      fullname: 'string',
      age: 10,
    };
  }
}
