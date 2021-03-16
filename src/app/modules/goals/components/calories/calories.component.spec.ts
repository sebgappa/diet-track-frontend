import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesComponent } from './calories.component';

describe('CaloriesComponent', () => {
  let component: CaloriesComponent;
  let fixture: ComponentFixture<CaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaloriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
