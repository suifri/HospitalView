import { TestBed } from '@angular/core/testing';

import { ScheduleDataServiceService } from './schedule-data-service.service';

describe('ScheduleDataServiceService', () => {
  let service: ScheduleDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
