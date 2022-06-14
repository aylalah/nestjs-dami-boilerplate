import { Injectable } from '@nestjs/common';
import { CreateEnrolmentDailyLogDto } from './dto/create-enrolment-daily-log.dto';
import { UpdateEnrolmentDailyLogDto } from './dto/update-enrolment-daily-log.dto';

@Injectable()
export class EnrolmentDailyLogService {
  create(createEnrolmentDailyLogDto: CreateEnrolmentDailyLogDto) {
    return 'This action adds a new enrolmentDailyLog';
  }

  findAll() {
    return `This action returns all enrolmentDailyLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrolmentDailyLog`;
  }

  update(id: number, updateEnrolmentDailyLogDto: UpdateEnrolmentDailyLogDto) {
    return `This action updates a #${id} enrolmentDailyLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrolmentDailyLog`;
  }
}
