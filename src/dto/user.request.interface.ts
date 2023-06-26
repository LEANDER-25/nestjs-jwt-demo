class UserLogin {
  username: string;
  password: string;
}

class UserRegister extends UserLogin {
  age?: number;
  assistRoles: string[];
  mainRole: string;
}

class LogOutDto {
  refreshToken: string;
  password?: string;
}

export { UserLogin, UserRegister, LogOutDto };
