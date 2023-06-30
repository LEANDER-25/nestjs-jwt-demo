import { UserSession } from 'src/model/user-session.model';
import { AbstractRepository } from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserSessionRepository extends AbstractRepository<UserSession> {
  constructor(dataSource: DataSource) {
    super(UserSession, dataSource);
  }
}
