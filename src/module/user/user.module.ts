import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from 'src/controller/user-info/user-info.controller';
import { Role } from 'src/model/role.model';
import { UserInfo } from 'src/model/user-info.model';
import { UserRole } from 'src/model/user-role.model';
import { User } from 'src/model/user.model';
import { UserService } from 'src/service/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserInfo, UserRole, Role])
    ],
    controllers: [UserInfoController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
