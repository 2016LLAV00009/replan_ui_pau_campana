import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileModifyPasswordComponent } from './perfile-modify-password.component';

describe('PerfileModifyPasswordComponent', () => {
  let component: PerfileModifyPasswordComponent;
  let fixture: ComponentFixture<PerfileModifyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfileModifyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfileModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
