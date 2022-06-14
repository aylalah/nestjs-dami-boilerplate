import { Test, TestingModule } from '@nestjs/testing';
import { EnrolmentDailyLogService } from './enrolment-daily-log.service';

describe('EnrolmentDailyLogService', () => {
  let service: EnrolmentDailyLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrolmentDailyLogService],
    }).compile();

    service = module.get<EnrolmentDailyLogService>(EnrolmentDailyLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
