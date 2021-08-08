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
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId, PaginateResult, UpdateWriteOpResult } from 'mongoose';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { IRemove } from 'src/interfaces';
import { CreateWorkDTO, EditWorkDTO } from './dtos';
import { Work, WorkDocument } from './schema/work.schema';
import { WorkService } from './work.service';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller({ version: '1', path: 'work' })
export class WorkController {
  constructor(private workService: WorkService) {}

  @Post()
  async create(@Request() req, @Body() work: CreateWorkDTO): Promise<Work> {
    const { userId }: { userId: ObjectId } = req;
    return this.workService.create(userId, work);
  }
  // create(
  //   @Param('userId') userId: ObjectId,
  //   @Body() work: CreateWorkDTO,
  // ): Promise<Work> {
  //   return this.workService.create(userId, work);
  // }

  @Get()
  async findAll(
    @Query('category', new DefaultValuePipe('')) category = '',
    @Query('title', new DefaultValuePipe('')) title = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginateResult<WorkDocument>> {
    return this.workService.findAll({ category, title }, { page, limit });
  }

  @Get(':projectId')
  async getOne(@Param('projectId') projectId: ObjectId): Promise<WorkDocument> {
    return this.workService.findOne(projectId);
  }

  @Patch(':projectId')
  async update(
    @Param('projectId') projectId: ObjectId,
    @Body() updateWork: EditWorkDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.workService.update(projectId, updateWork);
  }

  @Delete(':projectId')
  async remove(@Param('projectId') projectId: ObjectId): Promise<IRemove> {
    return this.workService.remove(projectId);
  }
}
