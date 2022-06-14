import { PartialType } from '@nestjs/swagger';
import { CreateEnrolmentDailyLogDto } from './create-enrolment-daily-log.dto';

export class UpdateEnrolmentDailyLogDto extends PartialType(CreateEnrolmentDailyLogDto) {}
