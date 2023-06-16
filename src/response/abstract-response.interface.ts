import { Metadata } from './metadata.interface';

export class AbstractResponse<T> {
  metadata?: Metadata;
  data: T;
}
