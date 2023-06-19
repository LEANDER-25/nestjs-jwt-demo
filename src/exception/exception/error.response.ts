import { EXCEPTION } from './enum.exception';

class ErrorResponse {
  message: string;
  errorCode: string;
  description: string;
  type: string;
  hint?: string;
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

let AgeNotAvailable: ErrorResponse = {
  message: 'Age is smaller than 0',
  errorCode: '0003',
  description: 'Age of user must not smaller than zero',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

let UsernameIsEmpty: ErrorResponse = {
  message: 'Username is empty',
  errorCode: '0004',
  description: 'Input username must not be empty',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

let PasswordIsEmpty: ErrorResponse = {
  message: 'Password is empty',
  errorCode: '0004',
  description: 'Input password  must not be empty',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

export {
  ErrorResponse,
  BadUserCredential,
  UserNotFound,
  AgeNotAvailable,
  UsernameIsEmpty,
  PasswordIsEmpty,
};
