import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileAvailabilityComponent } from './perfile-availability.component';

describe('PerfileAvailabilityComponent', () => {
  let component: PerfileAvailabilityComponent;
  let fixture: ComponentFixture<PerfileAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfileAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfileAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
