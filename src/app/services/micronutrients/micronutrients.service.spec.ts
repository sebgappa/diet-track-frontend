import { TestBed } from '@angular/core/testing';

import { MicronutrientsService } from './micronutrients.service';

describe('MicronutrientsService', () => {
  let service: MicronutrientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicronutrientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
