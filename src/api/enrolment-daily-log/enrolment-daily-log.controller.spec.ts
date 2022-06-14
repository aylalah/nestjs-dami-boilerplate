import { Test, TestingModule } from '@nestjs/testing';
import { EnrolmentDailyLogController } from './enrolment-daily-log.controller';
import { EnrolmentDailyLogService } from './enrolment-daily-log.service';

describe('EnrolmentDailyLogController', () => {
  let controller: EnrolmentDailyLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrolmentDailyLogController],
      providers: [EnrolmentDailyLogService],
    }).compile();

    controller = module.get<EnrolmentDailyLogController>(EnrolmentDailyLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
