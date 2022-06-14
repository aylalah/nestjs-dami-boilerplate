import { PartialType } from '@nestjs/swagger';
import { CreateInstitutionUserDto } from './create-institution-user.dto';

export class UpdateInstitutionUserDto extends PartialType(CreateInstitutionUserDto) {}
