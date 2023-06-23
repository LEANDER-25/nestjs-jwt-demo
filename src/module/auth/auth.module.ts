import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controller/auth/auth.controller';
import { Role } from 'src/model/role.model';
import { UserInfo } from 'src/model/user-info.model';
import { UserRole } from 'src/model/user-role.model';
import { UserSession } from 'src/model/user-session.model';
import { User } from 'src/model/user.model';
import { AuthService } from 'src/service/auth/auth.service';
import { SessionService } from 'src/service/session/session.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserInfo, UserRole, Role, UserSession])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, SessionService, ConfigService],
    exports: [AuthService],
})
export class AuthModule {}
