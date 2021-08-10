import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  // TODO: Protect this route and grant access only to superadmin
  @Post('signup')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req: any) {
    const { user } = req;
    const access = await this.authService.login(user._doc);
    await this.accountService.setCurrentRefreshToken(
      access.tokens.refresh_token,
      user._doc._id,
    );
    return access;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const { user } = req;
    return this.accountService.removeRefreshToken(user.userId);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(@Request() req: any) {
    const { user } = req;
    const payload = {
      email: user._doc.email,
      sub: user._doc._id,
      role: user._doc.role,
    };
    const token = await this.authService.getJwtAccessToken(payload);
    return {
      tokens: {
        access_token: token,
      },
    };
  }
}
