class UserLogin {
  username: string;
  password: string;
}

class UserRegister extends UserLogin {
  age?: number;
  assistRoles: string[];
  mainRole: string;
}

export { UserLogin, UserRegister };
