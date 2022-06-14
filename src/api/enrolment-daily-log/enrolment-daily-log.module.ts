import { Module } from '@nestjs/common';
import { EnrolmentDailyLogService } from './enrolment-daily-log.service';
import { EnrolmentDailyLogController } from './enrolment-daily-log.controller';

@Module({
  controllers: [EnrolmentDailyLogController],
  providers: [EnrolmentDailyLogService]
})
export class EnrolmentDailyLogModule {}
