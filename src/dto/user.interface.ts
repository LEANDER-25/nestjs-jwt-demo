class UserDto {
  id: number;
  username: string;
  roles: string[];
}

class UserInfoDto extends UserDto {
  fullname?: string;
  age?: number;
}

class RefreshAccessToken extends UserDto {
  accessToken: string;
}

class UserLoginSuccess extends RefreshAccessToken {
  refreshToken: string;
}

class UserToken extends UserDto {
  mainRole: string;
}

class AccessToken extends UserToken {
  refreshUUID: string
}

export { UserDto, UserInfoDto, UserLoginSuccess, RefreshAccessToken, UserToken, AccessToken };
