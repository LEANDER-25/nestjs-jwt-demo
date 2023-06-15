import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/dto/user.interface';
import { AbstractResponse } from 'src/response/abstract-response.interface';

@Injectable()
export class UserService {
  private readonly users: UserInfo[] = [];

  async createCat(cat: UserInfo): Promise<AbstractResponse<UserInfo>> {
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

  async gets(): Promise<AbstractResponse<UserInfo[]>> {
    return {
      data: this.users,
    };
  }
}
