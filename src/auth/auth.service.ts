import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtSrv: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    //! delete user.password;
    //! return user;
    //! const { password, ...result } = user;
    // TODO: Generate a JWT and return it here

    const payload = { sub: user.id, username: user.username };
    return {
      user,
      access_token: await this.jwtSrv.signAsync(payload),
    };
    //* instead of the user object
    //! return result;
  }
}
