import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkDTO } from './create-work.dto';

export class EditWorkDTO extends PartialType(CreateWorkDTO) {}
