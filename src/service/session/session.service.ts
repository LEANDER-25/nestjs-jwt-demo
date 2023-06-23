import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from 'src/model/user-session.model';
import { User } from 'src/model/user.model';
import { UUIDHelper } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findSession(refreshUUID: string): Promise<UserSession> {
    let sessions = await this.userSessionRepository.find({
      where: { refreshUUID },
    });
    if (sessions == null || sessions.length == 0) {
      return null;
    }
    return sessions[0];
  }

  async isAvailableAccessible(refreshUUID: string): Promise<Boolean> {
    let session = await this.findSession(refreshUUID);
    if (session == null) {
      return false;
    }
    return !session.isExpired && session.isActive;
  }

  async revokeAllAccessRight(userId: number): Promise<Boolean> {
    let user = await this.userRepository.findOne({
      where: { id: userId },
    });
    let sessions = await this.userSessionRepository.find({
      where: {
        user,
      },
    });
    if (sessions == null || sessions.length == 0) {
      return false;
    }
    sessions.forEach((s) => {
      s.isExpired = true;
      s.isActive = false;
    });

    await this.userSessionRepository.save(sessions);
  }

  async revokeAccessRight(refreshUUID: string): Promise<Boolean> {
    let session = await this.findSession(refreshUUID);
    if (session == null) {
      return false;
    }
    session.isExpired = true;
    session.isActive = false;
    await this.userSessionRepository.save(session);
    return true;
  }

  async initAccessRight(user: User): Promise<UserSession> {
    let refreshUUID = 'SessionNo' + UUIDHelper.generate() + "D" + Date.now();
    let session: UserSession = {
      user,
      refreshUUID,
      isExpired: false,
      isActive: true,
    };
    // return await this.userSessionRepository.save(session);
    return session;
  }
}
