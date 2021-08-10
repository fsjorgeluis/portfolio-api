import { Controller, Get, Param, Request } from '@nestjs/common';
import { Request as ExpressRequest, Router } from 'express';
import { AppService } from './app.service';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    return {
      routes: router.stack
        .map((layer) => {
          if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return `${method.toUpperCase()} ${path}`;
          }
        })
        .filter((item) => item !== undefined),
    };
  }
}
