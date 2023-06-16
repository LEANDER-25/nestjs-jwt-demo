class UserLogin {
  username: string;
  password: string;
}

class UserRegister extends UserLogin {
  age?: number;
  roles: string[];
}

export { UserLogin, UserRegister };