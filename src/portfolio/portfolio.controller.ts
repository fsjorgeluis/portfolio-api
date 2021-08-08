import { Controller, Param, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller({ version: '1', path: 'portfolio' })
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Post(':gitUser')
  async create(@Param('gitUser') gitUser: string): Promise<any> {
    return this.portfolioService.create(gitUser);
  }
}
