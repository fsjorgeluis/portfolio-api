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
import { CreateTechDTO, EditTechDTO } from './dtos';
import { Tech, TechDocument } from './schema/tech.schema';

@Injectable()
export class TechService {
  constructor(
    @InjectModel(Tech.name) private techModel: PaginateModel<TechDocument>,
  ) {}

  async create(id: ObjectId, tech: CreateTechDTO): Promise<Tech> {
    try {
      const jobsDone = Object.assign(tech, id);
      const newTech = new this.techModel(jobsDone);
      await newTech.save();

      return newTech;
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
  ): Promise<PaginateResult<TechDocument>> {
    try {
      return this.techModel.paginate({}, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId): Promise<TechDocument> {
    try {
      const tech = await this.techModel.findOne({ _id: id }).exec();
      if (!tech) throw new NotFoundException();

      return tech;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('La aptitud no se encuentra registrada!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateTech: EditTechDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const tech = await this.techModel.findById(id);
      if (!tech) throw new NotFoundException();
      const techUpdate = Object.assign(tech, updateTech);
      return await this.techModel.updateOne({ _id: id }, techUpdate);
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
      return this.techModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El proyecto que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }
}
