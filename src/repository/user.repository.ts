import { User } from 'src/model/user.model';
import { AbstractRepository } from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(dataSoruce: DataSource) {
    super(User, dataSoruce);
  }
}
