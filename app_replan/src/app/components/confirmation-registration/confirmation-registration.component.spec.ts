import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRegistrationComponent } from './confirmation-registration.component';

describe('ConfirmationRegistrationComponent', () => {
  let component: ConfirmationRegistrationComponent;
  let fixture: ComponentFixture<ConfirmationRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
