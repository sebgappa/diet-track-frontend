import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BreakdownComponent } from './breakdown.component';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;
  let toastrSpy;
  let firestoreSpy;

  beforeEach(async () => {
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule,
        FontAwesomeModule,
        ChartsModule
      ],
      declarations: [ BreakdownComponent ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastrSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
