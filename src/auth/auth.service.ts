import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/helper/password.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException("Invalid email")
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) throw new UnauthorizedException("Invalid password")

    const payload = { id: user.id, email: user.email }
    return { access_token: await this.jwtService.signAsync(payload) }
  }

}

