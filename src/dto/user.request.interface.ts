interface UserLogin {
  username: string;
  password: string;
}

interface UserRegister extends UserLogin {
  age?: number;
  roles: string[];
}

export { UserLogin, UserRegister }