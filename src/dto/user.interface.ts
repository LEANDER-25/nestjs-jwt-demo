class User {
  id: number;
  username: string;
  role: string[];
}

class UserInfo extends User {
  fullname: string;
  age: number;
}

class RefreshAccessToken extends User {
  accessToken: string;
}

class UserLoginSuccess extends RefreshAccessToken {
  refreshToken: string;
}

export { User, UserInfo, UserLoginSuccess, RefreshAccessToken };
