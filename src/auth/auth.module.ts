import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { PassportModule } from '@nestjs/passport';
import {
  LocalStrategy,
  JwtStrategy,
  JwtRefreshTokenStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/app/configuration.module';
import { AuthController } from './auth.controller';
import { AppConfigService } from 'src/config/app/configuration.service';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtAccessSecret,
        signOptions: {
          expiresIn: appConfigService.jwtAccessExpirationTime,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
