import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './model/role.model';
import { UserRole } from './model/user-role.model';
import { UserInfo } from './model/user-info.model';
import { User } from './model/user.model';
import { UserSession } from './model/user-session.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/configuration';
import { type } from 'os';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '12345678@a',
    //   database: 'nestjs_jwt_demo',
    //   synchronize: true,
    //   entities: [User, UserInfo, UserRole, Role, UserSession],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({

      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
