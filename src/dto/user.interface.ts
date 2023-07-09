class UserDto {
  id: number;
  username: string;
  roles: string[];
}

class UserInfoDto extends UserDto {
  fullname?: string;
  birth?: string;
  phone?: string;
  email?: string;
}

class UserTokenPayload extends UserDto {
  mainRole: string;
}

class UserLoginSuccess extends UserTokenPayload {
  refreshToken?: string;
  accessToken?: string;
}

class RefreshTokenPayload extends UserTokenPayload {
  refreshUUID: string;
  kindToken: string
}

class AccessibleResult {
  access: boolean
}

export {
  UserDto,
  UserInfoDto,
  UserLoginSuccess,
  UserTokenPayload,
  RefreshTokenPayload,
  AccessibleResult
};
