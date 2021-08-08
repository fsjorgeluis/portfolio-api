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
import { CreateNetworkDTO, EditNetworkDTO } from './dtos';
import { NetworkService } from './network.service';
import { Network, NetworkDocument } from './schema/network.schema';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller({ version: '1', path: 'network' })
export class NetworkController {
  constructor(private networkService: NetworkService) {}

  @Post()
  async create(
    @Request() req,
    @Body() network: CreateNetworkDTO,
  ): Promise<Network> {
    const { userId }: { userId: ObjectId } = req;
    return this.networkService.create(userId, network);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginateResult<NetworkDocument>> {
    return this.networkService.findAll({ page, limit });
  }

  @Get(':networkId')
  async getOne(
    @Param('networkId') networkId: ObjectId,
  ): Promise<NetworkDocument> {
    return this.networkService.findOne(networkId);
  }

  @Patch(':networkId')
  async update(
    @Param('networkId') id: ObjectId,
    @Body() updateNetwork: EditNetworkDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.networkService.update(id, updateNetwork);
  }

  @Delete(':networkId')
  async remove(@Param('networkId') networkId: ObjectId): Promise<IRemove> {
    return this.networkService.remove(networkId);
  }
}
