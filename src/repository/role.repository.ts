import { Role } from 'src/model/role.model';
import { AbstractRepository } from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource);
  }
}
