import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctoreDto } from './create-doctore.dto';

export class UpdateDoctoreDto extends PartialType(CreateDoctoreDto) {}
