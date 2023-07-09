import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './model/role.model';
import { UserRole } from './model/user-role.model';
import { UserInfo } from './model/user-info.model';
import { User } from './model/user.model';
import { UserSession } from './model/user-session.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/configuration';
import { DataSource } from 'typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/advise.controller';
import { AuthGuard } from './middleware/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from './service/session/session.service';
import { UserRepository } from './repository/user.repository';
import { UserSessionRepository } from './repository/user-session.repository';
import { RoleRepository } from './repository/role.repository';
import { UserInfoRepository } from './repository/user-info.repository';
import { UserRoleRepository } from './repository/user-role.repository';
import { AuthService } from './service/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        schema: configService.get<string>('database.schema'),
        database: configService.get<string>('database.databaseName'),
        synchronize: true,
        entities: [User, UserInfo, UserRole, Role, UserSession],
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        console.log(`Connect to DB: ${dataSource.isInitialized}`);
        return dataSource;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserRepository,
    UserRoleRepository,
    UserSessionRepository,
    UserInfoRepository,
    RoleRepository,
    JwtService,
    SessionService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
