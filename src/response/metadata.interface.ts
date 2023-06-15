import { Paging } from 'src/request/paging.interface';

export interface Metadata extends Paging {
  totalPages: number;
  totalElements: number;
}
