import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app/configuration.service';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly appConfigService: AppConfigService,
    private accountService: AccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const refreshToken = req?.headers?.authorization.split('Bearer ')[1];
    const id = payload.sub;
    return await this.accountService.getUserIfRefreshTokenMatches(
      refreshToken,
      id,
    );
  }
}
