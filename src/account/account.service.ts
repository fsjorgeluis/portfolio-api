import {
  BadRequestException,
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
import { UsersRoles } from 'src/auth/enums';
import { ComparePassword, EnumToString, HashPassword } from 'src/helpers';
import { IPaginationOptions, IRemove } from 'src/interfaces';
import { CreateAccountDTO, EditAccountDTO } from './dtos';
import { Account, AccountDocument } from './schema/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: PaginateModel<AccountDocument>,
  ) {}

  async create(createAccount: CreateAccountDTO): Promise<Account> {
    try {
      const exists = await this.accountModel.findOne({
        email: createAccount.email,
      });
      if (exists) throw new ConflictException();

      createAccount.password = await HashPassword(createAccount.password);

      const newAccount = new this.accountModel(createAccount);
      await newAccount.save();
      return newAccount;
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
  ): Promise<PaginateResult<AccountDocument>> {
    try {
      return this.accountModel.paginate({}, options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string): Promise<AccountDocument> {
    try {
      const account = await this.accountModel.findOne({ email }).exec();
      if (!account) throw new NotFoundException();

      return account;
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException('La cuenta no se encuentra registrado!');

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateAccount: EditAccountDTO,
  ): Promise<UpdateWriteOpResult> {
    try {
      const account = await this.accountModel.findById(id);
      if (!account) throw new NotFoundException();
      // const accountUpdate = Object.assign(account, updateAccount);
      // return await this.accountModel.updateOne({}, accountUpdate);
      return await this.accountModel.updateOne({ _id: id }, updateAccount);
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'La cuenta que intenta actualizar no existe!',
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
      return this.accountModel.deleteOne({ _id: id });
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          'La cuenta que intenta eliminar no existe!',
        );

      throw new InternalServerErrorException();
    }
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    id: ObjectId,
  ): Promise<void> {
    try {
      const currentHashedRefreshToken = await HashPassword(refreshToken);
      await this.accountModel.updateOne(
        { _id: id },
        { $set: { refreshToken: currentHashedRefreshToken } },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: ObjectId,
  ): Promise<Account> {
    try {
      const user = await this.accountModel.findById(id);
      const isRefreshTokenMatching = await ComparePassword(
        user.refreshToken,
        refreshToken,
      );
      if (isRefreshTokenMatching) {
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeRefreshToken(id: ObjectId): Promise<UpdateWriteOpResult> {
    try {
      return await this.accountModel.updateOne(
        { _id: id },
        { $set: { refreshToken: null } },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
