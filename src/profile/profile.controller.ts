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
} from '@nestjs/common';
import { ObjectId, PaginateResult, UpdateWriteOpResult } from 'mongoose';
import { CreateProfileDTO, EditProfileDTO } from './dtos';
import { IRemove } from './interfaces';
import { ProfileService } from './profile.service';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Controller({ version: '1', path: 'profile' })
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  create(@Body() createProfile: CreateProfileDTO): Promise<Profile> {
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

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProfile: EditProfileDTO,
  ): Promise<UpdateWriteOpResult> {
    return this.profileService.update(id, updateProfile);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId): Promise<IRemove> {
    return this.profileService.remove(id);
  }
}
