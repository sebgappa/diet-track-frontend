import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

import { ReviewModalComponent } from './review-modal.component';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;
  let activeModalSpy;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let toastrSpy;
  let userInfoSpy;
  let dateSpy;

  beforeEach(async () => {
    activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);
    dateSpy = jasmine.createSpyObj('DatePipe', ['transform']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection', 'get', 'set']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      
      providers: [
        {
          provide: NgbActiveModal,
          useValue: activeModalSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: ToastrService,
          useValue: toastrSpy
        },
        {
          provide: UserInfoService,
          useValue: userInfoSpy
        },
        {
          provide: DatePipe,
          userValue: dateSpy
        }
      ],
      declarations: [ ReviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
