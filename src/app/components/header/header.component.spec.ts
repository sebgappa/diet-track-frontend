import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { AuthenticationButtonComponent } from '../authentication-button/authentication-button.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [ HeaderComponent, AuthenticationButtonComponent ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
