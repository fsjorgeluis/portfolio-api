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
import { IPaginationOptions, IRemove } from 'src/interfaces';
import { CreateAptitudeDTO, EditAptitudeDTO } from './dtos';
import { Aptitude, AptitudeDocument } from './schema/aptitude.schema';

@Injectable()
export class AptitudeService {
  constructor(
    @InjectModel(Aptitude.name)
    private aptitudeModel: PaginateModel<AptitudeDocument>,
  ) {}

  async create(id: ObjectId, aptitude: CreateAptitudeDTO): Promise<Aptitude> {
    try {
      const jobsDone = Object.assign(aptitude, id);
      const newAptitude = new this.aptitudeModel(jobsDone);
      await newAptitude.save();

      return newAptitude;
    } catch (error) {
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD')
        throw new NotAcceptableException(
          'Uno de los campos requeridos está en blanco!',
        );

      throw new InternalServerErrorException();
    }
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<PaginateResult<AptitudeDocument>> {
    try {
      return this.aptitudeModel.paginate({}, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId): Promise<AptitudeDocument> {
    try {
      const aptitude = await this.aptitudeModel.findOne({ _id: id }).exec();
      if (!aptitude) throw new NotFoundException();

      return aptitude;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('La aptitud no se encuentra registrada!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateAptitude: EditAptitudeDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const aptitude = await this.aptitudeModel.findById(id);
      if (!aptitude) throw new NotFoundException();
      const aptitudeUpdate = Object.assign(aptitude, updateAptitude);
      return await this.aptitudeModel.updateOne({ _id: id }, aptitudeUpdate);
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El proyecto que intenta actualizar no existe!',
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
      return this.aptitudeModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El proyecto que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }
}
