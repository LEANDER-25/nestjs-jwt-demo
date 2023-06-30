import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountIsDisabled } from 'src/exception/exception/error.response';
import { UserSession } from 'src/model/user-session.model';
import { User } from 'src/model/user.model';
import { UserSessionRepository } from 'src/repository/user-session.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CollectionUtils, UUIDHelper } from 'src/utils/utils';

@Injectable()
export class SessionService {
  constructor(
    private userSessionRepository: UserSessionRepository,
    private userRepository: UserRepository,
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

  async isAvailableAccess(userId: number, refreshUUID: string): Promise<Boolean> {
    let user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user.isActive) {
      throw new ForbiddenException(AccountIsDisabled);
    }

    let sessions = await this.userSessionRepository.find({
      where: {
        refreshUUID,
        isActive: true,
        isExpired: false,
      },
    });
    return CollectionUtils.isNotEmpty(sessions);
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
    return true;
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
    let refreshUUID = 'SessionNo' + UUIDHelper.generate() + 'D' + Date.now();
    let session: UserSession = {
      user,
      refreshUUID,
      isExpired: false,
      isActive: true,
    };
    return await this.userSessionRepository.save(session);
    // return session;
  }
}
