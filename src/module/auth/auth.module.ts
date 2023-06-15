import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthService } from 'src/service/auth/auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
