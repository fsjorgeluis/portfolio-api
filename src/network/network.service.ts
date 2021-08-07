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
import { CreateNetworkDTO, EditNetworkDTO } from './dtos';
import { Network, NetworkDocument } from './schema/network.schema';

@Injectable()
export class NetworkService {
  constructor(
    @InjectModel(Network.name)
    private networkModel: PaginateModel<NetworkDocument>,
  ) {}

  async create(id: ObjectId, network: CreateNetworkDTO): Promise<Network> {
    try {
      const socialMedia = Object.assign(network, id);
      const newNetwork = new this.networkModel(socialMedia);
      await newNetwork.save();

      return newNetwork;
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
  ): Promise<PaginateResult<NetworkDocument>> {
    try {
      return this.networkModel.paginate({}, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId): Promise<NetworkDocument> {
    try {
      const network = await this.networkModel.findOne({ _id: id }).exec();
      if (!network) throw new NotFoundException();

      return network;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('El perfil no se encuentra registrado!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateNetwork: EditNetworkDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const socialMedia = await this.networkModel.findById(id);
      if (!socialMedia) throw new NotFoundException();
      const socialUpdate = Object.assign(socialMedia, updateNetwork);
      return await this.networkModel.updateOne({}, socialUpdate);
      // return await this.networkModel.updateOne({ _id: id }, updateNetwork);
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
      return this.networkModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'El perfil que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }
}
