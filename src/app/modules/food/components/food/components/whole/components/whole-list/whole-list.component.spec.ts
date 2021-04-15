import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WholeListComponent } from './whole-list.component';

describe('WholeListComponent', () => {
  let component: WholeListComponent;
  let fixture: ComponentFixture<WholeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ WholeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeListComponent);
    component = fixture.componentInstance;
    component.foodGroup = 'fruits';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
