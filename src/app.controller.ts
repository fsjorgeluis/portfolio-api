import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/portfolio/:gitUser')
  getPortfolio(@Param('gitUser') gitUser: string): any {
    return this.appService.getPortfolio(gitUser);
  }

  // @Get('/profile')
  // getProfile(): any {
  //   return this.appService.getProfile();
  // }

  // @Get('/socialMedia')
  // getSocialMedia(): any {
  //   return this.appService.getSocialMedia();
  // }

  // @Get('/work')
  // getWork(): any {
  //   return this.appService.getWork();
  // }

  @Get('/aptitude')
  getAptitude(): any {
    return this.appService.getAptitude();
  }

  @Get('/tech')
  getTech(): any {
    return this.appService.getTech();
  }
}
