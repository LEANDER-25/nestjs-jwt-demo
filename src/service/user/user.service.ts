import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/dto/user.interface';
import { AbstractResponse } from 'src/response/abstract-response.interface';

@Injectable()
export class UserService {
  private readonly users: UserInfoDto[] = [];

  async createCat(cat: UserInfoDto): Promise<AbstractResponse<UserInfoDto>> {
    let length = this.users.length;
    let lastId = 0;
    if ((length = 0)) {
      lastId = this.users[length - 1].id;
    }
    cat.id = lastId;
    this.users.push(cat);
    return {
      data: cat,
    };
  }

  async gets(): Promise<AbstractResponse<UserInfoDto[]>> {
    return {
      data: this.users,
    };
  }
}
