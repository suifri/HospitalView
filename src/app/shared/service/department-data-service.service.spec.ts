import { TestBed } from '@angular/core/testing';

import { DepartmentDataServiceService } from './department-data-service.service';

describe('DepartmentDataServiceService', () => {
  let service: DepartmentDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
