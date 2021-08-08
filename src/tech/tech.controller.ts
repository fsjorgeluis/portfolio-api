import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ObjectId, PaginateResult, UpdateWriteOpResult } from 'mongoose';
import { IRemove } from 'src/interfaces';
import { CreateTechDTO, EditTechDTO } from './dtos';
import { Tech, TechDocument } from './schema/tech.schema';
import { TechService } from './tech.service';

@Controller({ version: '1', path: 'tech' })
export class TechController {
  constructor(private techService: TechService) {}

  @Post()
  async create(@Request() req, @Body() work: CreateTechDTO): Promise<Tech> {
    const { userId }: { userId: ObjectId } = req;
    return this.techService.create(userId, work);
  }
  // create(
  //   @Param('userId') userId: ObjectId,
  //   @Body() work: CreateWorkDTO,
  // ): Promise<Work> {
  //   return this.techService.create(userId, work);
  // }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginateResult<TechDocument>> {
    return this.techService.findAll({ page, limit });
  }

  @Get(':techId')
  async getOne(@Param('techId') techId: ObjectId): Promise<TechDocument> {
    return this.techService.findOne(techId);
  }

  @Patch(':techId')
  async update(
    @Param('techId') techId: ObjectId,
    @Body() updateWork: EditTechDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.techService.update(techId, updateWork);
  }

  @Delete(':techId')
  async remove(@Param('techId') techId: ObjectId): Promise<IRemove> {
    return this.techService.remove(techId);
  }
}
