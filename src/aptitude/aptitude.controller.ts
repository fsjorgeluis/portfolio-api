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
import { AptitudeService } from './aptitude.service';
import { CreateAptitudeDTO, EditAptitudeDTO } from './dtos';
import { Aptitude, AptitudeDocument } from './schema/aptitude.schema';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller({ version: '1', path: 'aptitude' })
export class AptitudeController {
  constructor(private aptitudeService: AptitudeService) {}

  @Post()
  async create(
    @Request() req,
    @Body() work: CreateAptitudeDTO,
  ): Promise<Aptitude> {
    const { userId }: { userId: ObjectId } = req;
    return this.aptitudeService.create(userId, work);
  }
  // create(
  //   @Param('userId') userId: ObjectId,
  //   @Body() work: CreateWorkDTO,
  // ): Promise<Work> {
  //   return this.workService.create(userId, work);
  // }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginateResult<AptitudeDocument>> {
    return this.aptitudeService.findAll({ page, limit });
  }

  @Get(':aptitudeId')
  async getOne(
    @Param('aptitudeId') aptitudeId: ObjectId,
  ): Promise<AptitudeDocument> {
    return this.aptitudeService.findOne(aptitudeId);
  }

  @Patch(':aptitudeId')
  async update(
    @Param('aptitudeId') aptitudeId: ObjectId,
    @Body() updateWork: EditAptitudeDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.aptitudeService.update(aptitudeId, updateWork);
  }

  @Delete(':aptitudeId')
  async remove(@Param('aptitudeId') aptitudeId: ObjectId): Promise<IRemove> {
    return this.aptitudeService.remove(aptitudeId);
  }
}
