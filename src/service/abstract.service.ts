import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export abstract class AbstractService {
  constructor(protected configService: ConfigService) {}
  getJwtSignOption(tokenTypeExpireTimeConfig: string) {
    let jwtSignOption: JwtSignOptions = {
      secret: this.configService.get<string>('security.jwt.secretKey'),
      algorithm: 'HS256',
    };

    //   let refreshTokenSignOption: JwtSignOptions = {
    //     ...jwtSignOption,
    //     expiresIn: this.configService.get<string>('security.jwt.refreshExp'),
    //   };

    //   let accessTokenSignOption: JwtSignOptions = {
    //     ...jwtSignOption,
    //     expiresIn: this.configService.get<string>('security.jwt.accessExp'),
    //   };
    return {
      ...jwtSignOption,
      expiresIn: this.configService.get<string>(tokenTypeExpireTimeConfig),
    };
  }
}
