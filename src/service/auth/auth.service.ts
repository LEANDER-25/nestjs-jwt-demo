import { Injectable } from '@nestjs/common';
import { UserInfo, UserLoginSuccess } from 'src/dto/user.interface';
import { UserLogin, UserRegister } from 'src/dto/user.request.interface';
import { User } from 'src/model/user.model';
import * as UserInfoModel from 'src/model/user-info.model';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from 'src/exception/exception/collection.exception';
import {
  AgeNotAvailable,
  PasswordIsEmpty,
  UsernameIsEmpty,
} from 'src/exception/exception/error.response';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private userInfoRepository: Repository<UserInfo>,
  ) {}
  async register(payload: UserRegister): Promise<UserInfo> {
    let username = payload.username;
    let password = payload.password;
    let { age, roles } = payload;

    if (age < 0) {
      throw new BadRequestException(AgeNotAvailable);
    }

    checkUsername(username);
    checkPassword(password);

    let salt = 12;
    password = await bcrypt.hash(password, salt);

    let newUser: User = {
      username,
      password,
    };

    console.log(newUser);

    newUser = await this.userRepository.save(newUser);

    let newUserInfo: UserInfoModel.UserInfo = {
      user: newUser,
      age,
      fullname: '',
    };

    newUserInfo = await this.userInfoRepository.save(newUserInfo);

    let userInfoResponse: UserInfo = {
      id: newUser.id,
      age: newUserInfo.age,
      username: newUser.username,
      roles: roles,
    };

    return userInfoResponse;
  }

  async login(payload: UserLogin): Promise<UserLoginSuccess> {
    return {
      id: 1,
      refreshToken: '',
      accessToken: '',
      username: '',
      roles: [],
    };
  }
}
function checkUsername(username: string) {
  if (username == undefined || username == null) {
    throw new BadRequestException(UsernameIsEmpty);
  }
  // check username rules
  /*
  - limit in 16 chars
  - not contains spec chars (allow _.)
  */
}

function checkPassword(password: string) {
  if (password == undefined || password == null) {
    throw new BadRequestException(PasswordIsEmpty);
  }
}
