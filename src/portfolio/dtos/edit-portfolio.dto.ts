import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioDTO } from './create-portfolio.dto';

export class EditPortfolioDTO extends PartialType(CreatePortfolioDTO) {}
