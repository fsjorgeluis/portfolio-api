import { PartialType } from '@nestjs/mapped-types';
import { CreateAptitudeDTO } from './create-aptitude.dto';

export class EditAptitudeDTO extends PartialType(CreateAptitudeDTO) {}
