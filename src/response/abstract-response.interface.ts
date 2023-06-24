import { ErrorResponse } from 'src/exception/exception/error.response';
import { Metadata } from './metadata.interface';

export class AbstractResponse<T> {
  metadata?: Metadata;
  data?: T;
  statusCode?: number;
  error?: string | object | ErrorResponse;
  timestamp?: string = new Date().toISOString();
  path?: string;
}
