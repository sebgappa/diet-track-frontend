import { TestBed } from '@angular/core/testing';

import { GrimReaperService } from './grim-reaper.service';

describe('GrimReaperService', () => {
  let service: GrimReaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrimReaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
