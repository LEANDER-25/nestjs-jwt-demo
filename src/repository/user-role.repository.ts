import { UserRole } from 'src/model/user-role.model';
import { AbstractRepository } from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRoleRepository extends AbstractRepository<UserRole> {
  constructor(dataSource: DataSource) {
    super(UserRole, dataSource);
  }
}
