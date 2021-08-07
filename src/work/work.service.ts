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
import { IPaginationOptions, IPaginationQuery, IRemove } from 'src/interfaces';
import { CreateWorkDTO, EditWorkDTO } from './dtos';
import { Work, WorkDocument } from './schema/work.schema';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private workModel: PaginateModel<WorkDocument>,
  ) {}

  async create(id: ObjectId, network: CreateWorkDTO): Promise<Work> {
    try {
      const jobsDone = Object.assign(network, id);
      const newWork = new this.workModel(jobsDone);
      await newWork.save();

      return newWork;
    } catch (error) {
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD')
        throw new NotAcceptableException(
          'Uno de los campos requeridos está en blanco!',
        );

      throw new InternalServerErrorException();
    }
  }

  async findAll(
    query: IPaginationQuery,
    options: IPaginationOptions,
  ): Promise<PaginateResult<WorkDocument>> {
    try {
      const regex = RegExp(query.title, 'i');
      if (query.title) query.title = regex;

      const queryOptions = Object.entries(query)
        .filter(([key, value]) => value != '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      return this.workModel.paginate(queryOptions, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId): Promise<WorkDocument> {
    try {
      const work = await this.workModel.findOne({ _id: id }).exec();
      if (!work) throw new NotFoundException();

      return work;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('El proyecto no se encuentra registrado!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateWork: EditWorkDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const work = await this.workModel.findById(id);
      if (!work) throw new NotFoundException();
      const workUpdate = Object.assign(work, updateWork);
      return await this.workModel.updateOne({ _id: id }, workUpdate);
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
      return this.workModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El proyecto que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }
}
