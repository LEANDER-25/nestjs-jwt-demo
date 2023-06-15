import { EXCEPTION } from './enum.exception';

interface ErrorResponse {
  message: string;
  errorCode: string;
  description: string;
  type: string;
}

let BadUserCredential: ErrorResponse = {
  message: 'Username or password or token is incorrect',
  errorCode: '0001',
  description:
    'User information (username/password/token) for authorizing is incorrect',
  type: EXCEPTION[EXCEPTION.BAD_CREDENTIAL],
};

let UserNotFound: ErrorResponse = {
  message: 'User is not found',
  errorCode: '0002',
  description: 'User is not existed or can not find the user with condition',
  type: EXCEPTION[EXCEPTION.NOT_FOUND],
};

export { ErrorResponse, BadUserCredential, UserNotFound };
