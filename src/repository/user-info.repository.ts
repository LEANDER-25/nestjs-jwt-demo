import { UserInfo } from 'src/model/user-info.model';
import { AbstractRepository } from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserInfoRepository extends AbstractRepository<UserInfo> {
  constructor(dataSource: DataSource) {
    super(UserInfo, dataSource);
  }
}
