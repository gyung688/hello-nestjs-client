import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  // 세션에 저장
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email); // session에 저장할 정보
  }

  // 세션 정보로부터 유저 정보 복원
  async deserializeUser(payload: any, done: (err: Error, payload: any) => void): Promise<any> {
    const user = await this.userService.getUser(payload);
    if (!user) {
      done(new Error('No user found'), null);
      return;
    }
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
