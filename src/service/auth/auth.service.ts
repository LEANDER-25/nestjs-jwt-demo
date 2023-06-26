import { Injectable } from '@nestjs/common';
import {
  RefreshTokenPayload,
  UserInfoDto,
  UserLoginSuccess,
  UserTokenPayload,
} from 'src/dto/user.interface';
import {
  LogOutDto,
  UserLogin,
  UserRegister,
} from 'src/dto/user.request.interface';
import { User } from 'src/model/user.model';
import { UserInfo } from 'src/model/user-info.model';
import * as bcrypt from 'bcrypt';
import {
  BadCredentialException,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exception/exception/collection.exception';
import {
  AccountIsDisabled,
  AgeNotAvailable,
  BadUserCredential,
  PasswordContainingIllegalChar,
  PasswordIsEmpty,
  PasswordLengthIssue,
  PasswordMissingDigit,
  PasswordMissingLowerCase,
  PasswordMissingUpperCase,
  PayloadEmpty,
  RoleTypeNotFound,
  UsernameContainingIllegalChar,
  UsernameIsEmpty,
  UsernameLengthIssue,
} from 'src/exception/exception/error.response';
import { In, Repository } from 'typeorm';
import { CollectionUtils, ObjectUtils, StringUtils } from 'src/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/model/role.model';
import { UserRole } from 'src/model/user-role.model';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { ConfigService } from '@nestjs/config';
import { AbstractService } from '../abstract.service';

@Injectable()
export class AuthService extends AbstractService {
  constructor(
    @InjectRepository(User)
    protected userRepository: Repository<User>,

    @InjectRepository(UserInfo)
    protected userInfoRepository: Repository<UserInfo>,

    @InjectRepository(Role)
    protected readonly roleRepository: Repository<Role>,

    @InjectRepository(UserRole)
    protected userRoleRepository: Repository<UserRole>,

    protected jwtService: JwtService,

    protected sessionService: SessionService,

    protected configService: ConfigService,
  ) {
    super(configService);
  }

  protected readonly REFRESH_TOKEN_EXP_CONFIG = 'security.jwt.refreshExp';
  protected readonly ACCESS_TOKEN_EXP_CONFIG = 'security.jwt.accessExp';

  async register(payload: UserRegister): Promise<UserInfoDto> {
    let username = payload.username;
    let password = payload.password;
    let { age, assistRoles, mainRole } = payload;

    if (age < 0) {
      throw new BadRequestException(AgeNotAvailable);
    }

    this.checkUsername(username);
    this.checkPassword(password);

    let salt = 12;
    password = await bcrypt.hash(password, salt);

    let newUser: User = {
      username,
      password,
    };

    newUser = await this.userRepository.save(newUser);

    let assignedRoles: Role[] = [];
    assignedRoles = await this.getMainRoles(mainRole, assignedRoles);
    mainRole = assignedRoles[0].roleName;

    assignedRoles = await this.getAssistRoles(assistRoles, assignedRoles);

    let newUserInfo: UserInfo = {
      user: newUser,
      age,
      fullname: '',
    };
    newUserInfo = await this.userInfoRepository.save(newUserInfo);

    let roles: string[] = await this.saveRoles(
      assignedRoles,
      mainRole,
      username,
    );

    let userInfoResponse: UserInfoDto = {
      id: newUser.id,
      age: newUserInfo.age,
      username: newUser.username,
      roles: roles,
    };

    return userInfoResponse;
  }

  protected async saveRoles(
    assignedRoles: Role[],
    mainRole: string,
    username: string,
  ) {
    let userRoles: UserRole[] = assignedRoles.map((r) => {
      let isMainRole: boolean = false;
      if (r.roleName == mainRole) {
        isMainRole = true;
      }
      let userRole: UserRole = {
        username,
        roleName: r.roleName,
        isMain: isMainRole,
      };
      return userRole;
    });
    userRoles = await this.userRoleRepository.save(userRoles);
    let roles: string[] = userRoles.map((e) => e.roleName);
    return roles;
  }

  protected async getMainRoles(mainRole: string, assignedRoles: Role[]) {
    if (StringUtils.isEmpty(mainRole)) {
      const READER_ROLE = 'READER';
      let readerRole = await this.roleRepository.findOne({
        where: { roleName: READER_ROLE },
      });
      if (ObjectUtils.isNull(readerRole)) {
        let readerRole_: Role = {
          roleName: READER_ROLE,
        };
        readerRole = await this.roleRepository.save(readerRole_);
      }
      mainRole = READER_ROLE;
      assignedRoles.push(readerRole);
    } else {
      assignedRoles = await this.roleRepository.find({
        where: {
          roleName: mainRole,
        },
      });
      if (CollectionUtils.isNotEmpty(assignedRoles)) {
        throw new NotFoundException(RoleTypeNotFound);
      }
    }
    return assignedRoles;
  }

  protected async getAssistRoles(assistRoles: string[], assignedRoles: Role[]) {
    if (CollectionUtils.isEmpty(assistRoles)) {
      return assignedRoles;
    }
    let roleList = await this.roleRepository.find({
      where: {
        roleName: In(assistRoles),
      },
    });
    if (CollectionUtils.isEmpty(roleList)) {
      throw new NotFoundException(RoleTypeNotFound);
    }
    return assignedRoles.concat(roleList);
  }

  protected checkUsername(username: string) {
    if (StringUtils.isEmpty(username)) {
      throw new BadRequestException(UsernameIsEmpty);
    }
    // check username rules
    /*
    - limit in 16 chars
    - not contains spec chars (allow _.)
    */
    if (username.length > 16 || username.length <= 3) {
      throw new BadRequestException(UsernameLengthIssue);
    }
    if (!username.match('^[^_.]+$')) {
      throw new BadRequestException(UsernameContainingIllegalChar);
    }
  }

  protected checkPassword(password: string) {
    if (StringUtils.isEmpty(password)) {
      throw new BadRequestException(PasswordIsEmpty);
    }
    if (password.length > 16 || password.length <= 8) {
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
    if (!password.match('^[0-9a-zA-Z^_@$\\^&%.]+$')) {
      throw new BadRequestException(PasswordContainingIllegalChar);
    }
  }

  async login(payload: UserLogin): Promise<UserLoginSuccess> {
    this.checkLoginPayload(payload);

    let user = await this.userRepository.findOne({
      where: { username: payload.username },
    });

    if (ObjectUtils.isNull(user)) {
      console.log('Not found user');
      throw new BadCredentialException(BadUserCredential);
    }

    let isMatchPwd = await bcrypt.compare(payload.password, user.password);
    if (!isMatchPwd) {
      console.log('Password not matched');
      throw new BadCredentialException(BadUserCredential);
    }

    if (!user.isActive) {
      throw new ForbiddenException(AccountIsDisabled);
    }

    let userRoles = await this.userRoleRepository.find({
      where: { username: payload.username },
    });

    if (CollectionUtils.isEmpty(userRoles)) {
      throw new InternalServerErrorException();
    }
    let roles = userRoles.map((e) => e.roleName);
    let mainRoles = userRoles
      .filter((e) => e.isMain == true)
      .map((e) => e.roleName);

    if (CollectionUtils.isEmpty(mainRoles) || mainRoles.length > 1) {
      throw new InternalServerErrorException();
    }

    let userToken: UserTokenPayload = {
      id: user.id,
      username: user.username,
      roles,
      mainRole: mainRoles[0],
    };

    let newSession = await this.sessionService.initAccessRight(user);

    let refreshUUID = newSession.refreshUUID;

    let refreshTokenPayload: RefreshTokenPayload = {
      ...userToken,
      refreshUUID,
    };
    let refreshTokenSignOption: JwtSignOptions = this.getJwtSignOption(
      this.REFRESH_TOKEN_EXP_CONFIG,
    );

    let accessTokenSignOption: JwtSignOptions = this.getJwtSignOption(
      this.ACCESS_TOKEN_EXP_CONFIG,
    );

    let refreshToken = await this.jwtService.signAsync(
      refreshTokenPayload,
      refreshTokenSignOption,
    );
    let accessToken = await this.jwtService.signAsync(
      userToken,
      accessTokenSignOption,
    );

    return {
      ...userToken,
      refreshToken,
      accessToken,
    };
  }

  private checkLoginPayload(payload: UserLogin) {
    if (ObjectUtils.isNull(payload)) {
      throw new BadRequestException(PayloadEmpty);
    }

    if (StringUtils.isEmpty(payload.username)) {
      throw new BadRequestException(UsernameIsEmpty);
    }

    if (StringUtils.isEmpty(payload.password)) {
      throw new BadRequestException(PasswordIsEmpty);
    }
  }

  async logout(payload: LogOutDto) {
    if (
      ObjectUtils.isNull(payload) ||
      StringUtils.isEmpty(payload.refreshToken)
    ) {
      throw new BadRequestException(PayloadEmpty);
    }

    if (!payload.refreshToken.startsWith('Bearer')) {
      throw new BadCredentialException(BadUserCredential);
    }

    payload.refreshToken = payload.refreshToken.substring(6).trim();

    let refreshTokenSignOption = this.getJwtSignOption(
      this.REFRESH_TOKEN_EXP_CONFIG,
    );
    let refreshTokenPayload: RefreshTokenPayload = null;
    try {
      refreshTokenPayload = await this.jwtService.verifyAsync(
        payload.refreshToken,
        refreshTokenSignOption,
      );
    } catch (ex) {
      console.log(ex);
      throw new BadCredentialException(BadUserCredential);
    }
    if (
      ObjectUtils.isNull(refreshTokenPayload) ||
      StringUtils.isEmpty(refreshTokenPayload.refreshUUID) ||
      ObjectUtils.isNull(refreshTokenPayload.id)
    ) {
      throw new BadCredentialException(BadUserCredential);
    }
    let isAvailableAccess = await this.sessionService.isAvailableAccess(
      refreshTokenPayload.id,
      refreshTokenPayload.refreshUUID,
    );
    if (!isAvailableAccess) {
      throw new BadCredentialException(BadUserCredential);
    }
    let result = await this.sessionService.revokeAccessRight(
      refreshTokenPayload.refreshUUID,
    );
    if (!result) {
      throw new BadCredentialException(BadUserCredential);
    }
  }

  async logoutEverywhere() {}
}
