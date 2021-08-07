import { PartialType } from '@nestjs/mapped-types';
import { CreateNetworkDTO } from './create-network.dto';

export class EditNetworkDTO extends PartialType(CreateNetworkDTO) {}
