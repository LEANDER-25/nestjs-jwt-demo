import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IgnoreTokenCheckUrlCollection } from 'src/config/ignoreurls.setting';
import { TokenSetting } from 'src/config/token.setting';
import { RefreshTokenPayload } from 'src/dto/user.interface';
import { SessionService } from 'src/service/session/session.service';
import { ObjectUtils, StringUtils } from 'src/utils/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Welcome to Auth Guard! At here we will authorize you');
    const request = context.switchToHttp().getRequest();
    // rawHeaders
    // originalUrl
    // body
    const { rawHeaders, originalUrl, url, method, body } = request;
    let ignoreTokenCheckUrls = IgnoreTokenCheckUrlCollection.getInstance().urls;
    if (ignoreTokenCheckUrls.includes(url)) {
      return true;
    }

    let rawHeadersCasted = rawHeaders as string[];

    let authHeaderIndex = rawHeadersCasted.indexOf('Authorization');
    if (ObjectUtils.isNull(authHeaderIndex) || authHeaderIndex < 0) {
      /* set status is 401 */
      return false;
    }
    let token = rawHeadersCasted[authHeaderIndex + 1];
    if (!token.startsWith('Bearer')) {
      /* set status is 401 */
      return false;
    }
    token = token.substring(6).trim();
    let authTokenPayload: RefreshTokenPayload;
    let tokenSetting = TokenSetting.getInstance();
    let jwtSignOption: JwtSignOptions = {
      secret: tokenSetting.secretKey,
      algorithm: 'HS256',
      expiresIn: tokenSetting.accessExp,
    };

    try {
      authTokenPayload = await this.jwtService.verifyAsync(
        token,
        jwtSignOption,
      );
    } catch (ex) {
      console.log(ex);
      // throw new BadCredentialException(BadUserCredential);
      return false;
    }
    if (!authTokenPayload) {
      return false;
    }
    if (StringUtils.isEmpty(authTokenPayload.refreshUUID)) {
      return false;
    }
    if (!authTokenPayload.refreshUUID.startsWith('(A)')) {
      return false;
    }
    let refreshUUID = authTokenPayload.refreshUUID.substring(3);
    let isAvailableAccess = await this.sessionService.isAvailableAccess(
      authTokenPayload.id,
      refreshUUID,
    );

    return isAvailableAccess.valueOf();
  }
}
