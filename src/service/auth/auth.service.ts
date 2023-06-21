import { Injectable } from '@nestjs/common';
import { UserInfo, UserLoginSuccess } from 'src/dto/user.interface';
import { UserLogin, UserRegister } from 'src/dto/user.request.interface';
import { User } from 'src/model/user.model';
import * as UserInfoModel from 'src/model/user-info.model';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from 'src/exception/exception/collection.exception';
import {
  AgeNotAvailable,
  PasswordContainingIllegalChar,
  PasswordIsEmpty,
  PasswordLengthIssue,
  PasswordMissingDigit,
  PasswordMissingLowerCase,
  PasswordMissingUpperCase,
  UsernameContainingIllegalChar,
  UsernameIsEmpty,
  UsernameLengthIssue,
} from 'src/exception/exception/error.response';
import { In, Repository } from 'typeorm';
import { CollectionUtils, StringUtils } from 'src/utils/collection-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/model/role.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserInfoModel.UserInfo)
    private userInfoRepository: Repository<UserInfoModel.UserInfo>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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

    let assignedRoles: Role[] = [];
    if (CollectionUtils.isEmpty(roles)) {
      let readerRole = await this.roleRepository.findOne({
        where: { roleName: 'READER' },
      });
      if (readerRole == undefined || readerRole == null) {
        let readerRole_: Role = {
          roleName: 'READER',
        };
        readerRole = await this.roleRepository.save(readerRole_);
      }
      assignedRoles.push(readerRole);
    } else {
      assignedRoles = await this.roleRepository.find({
        where: {
          roleName: In(roles),
        },
      });
    }

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
  if (StringUtils.isEmpty(username)) {
    throw new BadRequestException(UsernameIsEmpty);
  }
  // check username rules
  /*
  - limit in 16 chars
  - not contains spec chars (allow _.)
  */
  if (username.length > 16 || username.length < 8) {
    throw new BadRequestException(UsernameLengthIssue);
  }
  if (!username.match('^[^_.]+$')) {
    throw new BadRequestException(UsernameContainingIllegalChar);
  }
}

function checkPassword(password: string) {
  if (StringUtils.isEmpty(password)) {
    throw new BadRequestException(PasswordIsEmpty);
  }
  if (password.length > 16 || password.length < 8) {
    throw new BadRequestException(PasswordLengthIssue);
  }
  if (!password.match('\\d')) {
    throw new BadRequestException(PasswordMissingDigit);
  }
  if (!password.match('[a-z]')) {
    throw new BadRequestException(PasswordMissingLowerCase);
  }
  if (!password.match('[A-Z]')) {
    throw new BadRequestException(PasswordMissingUpperCase);
  }
  if (!password.match('^[^_@$\\^&%.]+$')) {
    throw new BadRequestException(PasswordContainingIllegalChar);
  }
}
