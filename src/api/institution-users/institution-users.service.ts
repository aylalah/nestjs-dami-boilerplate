import { Injectable } from '@nestjs/common';
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto } from './dto/update-institution-user.dto';

@Injectable()
export class InstitutionUsersService {
  create(createInstitutionUserDto: CreateInstitutionUserDto) {
    return 'This action adds a new institutionUser';
  }

  findAll() {
    return `This action returns all institutionUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institutionUser`;
  }

  update(id: number, updateInstitutionUserDto: UpdateInstitutionUserDto) {
    return `This action updates a #${id} institutionUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} institutionUser`;
  }
}
