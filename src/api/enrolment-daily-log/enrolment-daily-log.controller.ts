import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrolmentDailyLogService } from './enrolment-daily-log.service';
import { CreateEnrolmentDailyLogDto } from './dto/create-enrolment-daily-log.dto';
import { UpdateEnrolmentDailyLogDto } from './dto/update-enrolment-daily-log.dto';

@Controller('enrolment-daily-log')
export class EnrolmentDailyLogController {
  constructor(private readonly enrolmentDailyLogService: EnrolmentDailyLogService) {}

  @Post()
  create(@Body() createEnrolmentDailyLogDto: CreateEnrolmentDailyLogDto) {
    return this.enrolmentDailyLogService.create(createEnrolmentDailyLogDto);
  }

  @Get()
  findAll() {
    return this.enrolmentDailyLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrolmentDailyLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrolmentDailyLogDto: UpdateEnrolmentDailyLogDto) {
    return this.enrolmentDailyLogService.update(+id, updateEnrolmentDailyLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrolmentDailyLogService.remove(+id);
  }
}
