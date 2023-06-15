import { Controller } from '@nestjs/common';
import { Get, Header, HttpCode } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';

@Controller('user-info')
export class UserInfoController {

  constructor(private userService: UserService) {}

  @Get('/hello')
  @Header('X-Timezone', 'GMT+7')
  @HttpCode(201)
  hello() {
    return { greeting: 'Hello World' };
  }
}
