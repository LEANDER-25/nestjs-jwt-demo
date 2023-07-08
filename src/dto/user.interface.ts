class UserDto {
  id: number;
  username: string;
  roles: string[];
}

class UserInfoDto extends UserDto {
  fullname?: string;
  age?: number;
  phone?: string;
  email?: string;
}

class UserLoginSuccess {
  refreshToken?: string;
  accessToken?: string;
}

class UserTokenPayload extends UserDto {
  mainRole: string;
}

class RefreshTokenPayload extends UserTokenPayload {
  refreshUUID: string;
}

export {
  UserDto,
  UserInfoDto,
  UserLoginSuccess,
  UserTokenPayload,
  RefreshTokenPayload,
};
