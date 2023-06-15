import { Metadata } from './metadata.interface';

export interface AbstractResponse<T> {
  metadata?: Metadata;
  data: T;
}
