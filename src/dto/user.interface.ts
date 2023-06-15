interface User {
  id: number;
  username: string;
  role: string[];
}

interface UserInfo extends User {
  fullname: string;
  age: number;
}

interface RefreshAccessToken extends User {
  accessToken: string;
}

interface UserLoginSuccess extends RefreshAccessToken {
  refreshToken: string;
}

export { User, UserInfo, UserLoginSuccess, RefreshAccessToken };
