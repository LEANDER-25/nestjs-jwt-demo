import { Paging } from 'src/request/paging.interface';

export class Metadata extends Paging {
  totalPages: number;
  totalElements: number;
}
