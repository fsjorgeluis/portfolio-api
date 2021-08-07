import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ObjectId,
  PaginateModel,
  PaginateResult,
  UpdateWriteOpResult,
} from 'mongoose';
import { CreateProfileDTO, EditProfileDTO } from './dtos';
import { IPaginationOptions, IRemove } from './interfaces';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: PaginateModel<ProfileDocument>,
  ) {}

  async create(createProfile: CreateProfileDTO): Promise<Profile> {
    try {
      const exists = await this.profileModel.findOne({
        gitUser: createProfile.gitUser,
      });
      if (exists) throw new ConflictException();

      const newProfile = new this.profileModel(createProfile);
      await newProfile.save();

      return newProfile;
    } catch (error) {
      if (error.status === 409)
        throw new ConflictException(
          'Ya estos datos se encuentran registrados!.',
        );

      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD')
        throw new NotAcceptableException(
          'Uno de los campos requeridos está en blanco!',
        );

      throw new InternalServerErrorException();
    }
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<PaginateResult<ProfileDocument>> {
    try {
      return this.profileModel.paginate({}, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(gitUser: string): Promise<ProfileDocument> {
    try {
      const profile = await this.profileModel.findOne({ gitUser }).exec();
      if (!profile) throw new NotFoundException();

      return profile;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('El perfil no se encuentra registrado!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateProfile: EditProfileDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const profile = await this.profileModel.findById(id);
      if (!profile) throw new NotFoundException();
      // const profileUpdate = Object.assign(profile, updateProfile);
      // return await this.profileModel.updateOne({}, profileUpdate);
      return await this.profileModel.updateOne({ _id: id }, updateProfile);
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El perfil que intenta actualizar no existe!',
        );

      if (error.code === 11000 || error.status === 409)
        throw new ConflictException(
          'El campo que intenta actualizar ya se encuentra registrado, intenta otro nombre',
        );

      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: ObjectId): Promise<IRemove> {
    try {
      return this.profileModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El perfil que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }
}
