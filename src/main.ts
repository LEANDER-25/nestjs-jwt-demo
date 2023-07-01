import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IgnoreTokenCheckUrlCollection } from './config/ignoreurls.setting';
import { TokenSetting } from './config/token.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const ignoreUrl = IgnoreTokenCheckUrlCollection.getInstance();
  ignoreUrl.urls = configService.get('ignoreTokenCheckUrls');
  const tokenSetting = TokenSetting.getInstance();
  tokenSetting.secretKey = configService.get('security.jwt.secretKey');
  tokenSetting.refreshExp = configService.get('security.jwt.refreshExp');
  tokenSetting.accessExp = configService.get('security.jwt.accessExp');
  const PORT = configService.get('http.port');
  console.log(`The Service is running in PORT: ${PORT}`);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(PORT | 8080);
}
bootstrap();
