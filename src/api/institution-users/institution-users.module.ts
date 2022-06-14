import { Module } from '@nestjs/common';
import { InstitutionUsersService } from './institution-users.service';
import { InstitutionUsersController } from './institution-users.controller';

@Module({
  controllers: [InstitutionUsersController],
  providers: [InstitutionUsersService]
})
export class InstitutionUsersModule {}
