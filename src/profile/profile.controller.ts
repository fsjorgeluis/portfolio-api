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
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId, PaginateResult, UpdateWriteOpResult } from 'mongoose';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { CreateProfileDTO, EditProfileDTO } from './dtos';
import { IRemove } from '../interfaces';
import { ProfileService } from './profile.service';
import { Profile, ProfileDocument } from './schema/profile.schema';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller({ version: '1', path: 'profile' })
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async create(@Body() createProfile: CreateProfileDTO): Promise<Profile> {
    return this.profileService.create(createProfile);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<PaginateResult<ProfileDocument>> {
    return this.profileService.findAll({ page, limit });
  }

  @Get(':gitUser')
  async getOne(@Param('gitUser') gitUser: string): Promise<ProfileDocument> {
    return this.profileService.findOne(gitUser);
  }

  @Patch(':profileId')
  async update(
    @Param('profileId') profileId: ObjectId,
    @Body() updateProfile: EditProfileDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.profileService.update(profileId, updateProfile);
  }

  @Delete(':profileId')
  async remove(@Param('profileId') profileId: ObjectId): Promise<IRemove> {
    return this.profileService.remove(profileId);
  }
}
