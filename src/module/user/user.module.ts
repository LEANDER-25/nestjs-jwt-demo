import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from 'src/controller/user-info/user-info.controller';
import { Role } from 'src/model/role.model';
import { UserInfo } from 'src/model/user-info.model';
import { UserRole } from 'src/model/user-role.model';
import { UserSession } from 'src/model/user-session.model';
import { User } from 'src/model/user.model';
import { RoleRepository } from 'src/repository/role.repository';
import { UserInfoRepository } from 'src/repository/user-info.repository';
import { UserRoleRepository } from 'src/repository/user-role.repository';
import { UserSessionRepository } from 'src/repository/user-session.repository';
import { UserRepository } from 'src/repository/user.repository';
import { SessionService } from 'src/service/session/session.service';
import { UserService } from 'src/service/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo, UserRole, Role, UserSession]),
  ],
  controllers: [UserInfoController],
  providers: [
    UserService,
    SessionService,
    UserRepository,
    UserRoleRepository,
    UserSessionRepository,
    UserInfoRepository,
    RoleRepository,
  ],
  exports: [UserService, SessionService],
})
export class UserModule {}
