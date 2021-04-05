import { TestBed } from '@angular/core/testing';

import { MacronutrientsService } from './macronutrients.service';

describe('MacronutrientsService', () => {
  let service: MacronutrientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacronutrientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
