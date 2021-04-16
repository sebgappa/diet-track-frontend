import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let modalServiceSpy;

  beforeEach(() => {
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgbModal,
          useValue: modalServiceSpy
        }
      ]
    });
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
