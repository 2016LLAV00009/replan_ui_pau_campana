import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendValidationAgainComponent } from './send-validation-again.component';

describe('SendValidationAgainComponent', () => {
  let component: SendValidationAgainComponent;
  let fixture: ComponentFixture<SendValidationAgainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendValidationAgainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendValidationAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
