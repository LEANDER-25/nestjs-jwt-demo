import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IgnoreTokenCheckUrlCollection } from 'src/config/ignoreurls.setting';
import { AuthService } from 'src/service/auth/auth.service';
import { ObjectUtils } from 'src/utils/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
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
    return await this.authService.verifyAccessToken(token);
  }
}
