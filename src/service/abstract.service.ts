import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { TokenSetting } from 'src/config/token.setting';

export abstract class AbstractService {
  constructor(protected configService: ConfigService) {}
  readonly tokenSetting = TokenSetting.getInstance();
  getJwtSignOption(isRefresh: boolean): JwtSignOptions {
    let jwtSignOption: JwtSignOptions = {
      secret: this.tokenSetting.secretKey,
      algorithm: 'HS256',
    };
    return {
      ...jwtSignOption,
      expiresIn: isRefresh
        ? this.tokenSetting.refreshExp
        : this.tokenSetting.accessExp,
    };
  }
}
