import { EXCEPTION } from './enum.exception';

class ErrorResponse {
  message: string;
  errorCode: string;
  description: string;
  type: string;
  hint?: string;
}

const BadUserCredential: ErrorResponse = {
  message: 'Username or password or token is incorrect',
  errorCode: '0001',
  description:
    'User information (username/password/token) for authorizing is incorrect',
  type: EXCEPTION[EXCEPTION.BAD_CREDENTIAL],
};

const UserNotFound: ErrorResponse = {
  message: 'User is not found',
  errorCode: '0002',
  description: 'User is not existed or can not find the user with condition',
  type: EXCEPTION[EXCEPTION.NOT_FOUND],
};

const AgeNotAvailable: ErrorResponse = {
  message: 'Age is smaller than 0',
  errorCode: '0003',
  description: 'Age of user must not smaller than zero',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const UsernameIsEmpty: ErrorResponse = {
  message: 'Username is empty',
  errorCode: '0004#0',
  description: 'Input username must not be empty',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const UsernameLengthIssue: ErrorResponse = {
  message: 'Username is too long or too short',
  errorCode: '0004#1',
  description: 'Input username is greater than 16 chars or smaller than 8 chars',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const UsernameContainingIllegalChar: ErrorResponse = {
  message: 'Username is containing illegal characters',
  errorCode: '0004#2',
  description: 'Input username is containing illegal characters',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordIsEmpty: ErrorResponse = {
  message: 'Password is empty',
  errorCode: '0005#0',
  description: 'Input password must not be empty',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordLengthIssue: ErrorResponse = {
  message: 'Password is too long or too short',
  errorCode: '0005#1',
  description:
    'Input password is greater than 16 chars or smaller than 8 chars',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordMissingDigit: ErrorResponse = {
  message: 'Password is missing digits',
  errorCode: '0005#2',
  description: 'Password is missing digits. Check rules of password!',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordMissingLowerCase: ErrorResponse = {
  message: 'Password is missing lower case characters',
  errorCode: '0005#3',
  description: 'Password is missing lower case characters. Check rules of password!',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordMissingUpperCase: ErrorResponse = {
  message: 'Password is missing upper case characters',
  errorCode: '0005#4',
  description: 'Password is missing upper case characters. Check rules of password!',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const PasswordContainingIllegalChar: ErrorResponse = {
  message: 'Password is containing illegal characters',
  errorCode: '0005#5',
  description: 'Password is containing illegal characters. Check rules of password!',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

const RoleTypeNotFound: ErrorResponse = {
  message: 'The role type(s) not found',
  errorCode: '0006',
  description: 'The role type(s) is not found in the system',
  type: EXCEPTION[EXCEPTION.NOT_FOUND],
};

const PayloadEmpty: ErrorResponse = {
  message: 'The payload is empty',
  errorCode: '0007',
  description: 'The request payload is empty',
  type: EXCEPTION[EXCEPTION.BAD_REQUEST],
};

export {
  ErrorResponse,
  BadUserCredential,
  UserNotFound,
  AgeNotAvailable,
  UsernameIsEmpty,
  UsernameLengthIssue,
  UsernameContainingIllegalChar,
  PasswordIsEmpty,
  PasswordLengthIssue,
  PasswordMissingDigit,
  PasswordMissingLowerCase,
  PasswordMissingUpperCase,
  PasswordContainingIllegalChar,
  RoleTypeNotFound,
  PayloadEmpty
};
