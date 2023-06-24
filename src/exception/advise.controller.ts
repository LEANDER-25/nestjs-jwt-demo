import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AbstractResponse } from 'src/response/abstract-response.interface';
import { ErrorResponse } from './exception/error.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let errorResponse: AbstractResponse<ErrorResponse> = {
      statusCode: status,
      error: exception.getResponse(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
