import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePassword } from 'src/helpers';
import { AccountService } from 'src/account/account.service';
import { AppConfigService } from 'src/config/app/configuration.service';
import { TokenPayload } from 'src/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.accountService.findOne(email);
    const isMatch = await ComparePassword(user.password, password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload: TokenPayload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    return {
      sub: user._id,
      email: user.email,
      user: user.gitUser,
      role: user.role,
      tokens: {
        access_token: await this.getJwtAccessToken(payload),
        expiresIn: this.appConfigService.jwtAccessExpirationTime,
        refresh_token: await this.getJwtRefreshToken(payload),
      },
    };
  }

  async register(user: any): Promise<any> {
    await this.accountService.create(user);
    return {
      statusCode: 201,
      message: 'Usuario creado satisfactoriamente',
    };
  }

  async getJwtAccessToken(payload: TokenPayload): Promise<string> {
    const token = this.jwtService.sign(payload, {
      secret: this.appConfigService.jwtAccessSecret,
      expiresIn: this.appConfigService.jwtAccessExpirationTime,
    });
    return token;
  }

  async getJwtRefreshToken(payload: TokenPayload): Promise<string> {
    const token = this.jwtService.sign(payload, {
      secret: this.appConfigService.jwtRefreshSecret,
      expiresIn: this.appConfigService.jwtRefreshExpirationTime,
    });
    return token;
  }
}
