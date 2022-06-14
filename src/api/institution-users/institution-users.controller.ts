import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionUsersService } from './institution-users.service';
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto } from './dto/update-institution-user.dto';

@Controller('institution-users')
export class InstitutionUsersController {
  constructor(private readonly institutionUsersService: InstitutionUsersService) {}

  @Post()
  create(@Body() createInstitutionUserDto: CreateInstitutionUserDto) {
    return this.institutionUsersService.create(createInstitutionUserDto);
  }

  @Get()
  findAll() {
    return this.institutionUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstitutionUserDto: UpdateInstitutionUserDto) {
    return this.institutionUsersService.update(+id, updateInstitutionUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionUsersService.remove(+id);
  }
}
