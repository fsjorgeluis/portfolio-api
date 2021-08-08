import { PartialType } from '@nestjs/mapped-types';
import { CreateTechDTO } from './create-tech.dto';

export class EditTechDTO extends PartialType(CreateTechDTO) {}
