import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './error.response';
import { EXCEPTION } from './enum.exception';

class ForbiddenException extends HttpException {
  static STATUS_CODE: HttpStatus = HttpStatus.FORBIDDEN;
  constructor(errorResponse?: ErrorResponse) {
    if (!errorResponse) {
      super(EXCEPTION.FORBIDDEN, ForbiddenException.STATUS_CODE);
    } else {
      super(errorResponse, ForbiddenException.STATUS_CODE);
    }
  }
}

class BadCredentialException extends HttpException {
  static STATUS_CODE: HttpStatus = HttpStatus.UNAUTHORIZED;
  constructor(errorResponse?: ErrorResponse) {
    if (!errorResponse) {
      super(EXCEPTION.BAD_CREDENTIAL, BadCredentialException.STATUS_CODE);
    } else {
      super(errorResponse, BadCredentialException.STATUS_CODE);
    }
  }
}

class NotFoundException extends HttpException {
  static STATUS_CODE: HttpStatus = HttpStatus.NOT_FOUND;
  constructor(errorResponse?: ErrorResponse) {
    if (!errorResponse) {
      super(EXCEPTION.BAD_CREDENTIAL, BadCredentialException.STATUS_CODE);
    } else {
      super(errorResponse, BadCredentialException.STATUS_CODE);
    }
  }
}

export { ForbiddenException, BadCredentialException, NotFoundException };
