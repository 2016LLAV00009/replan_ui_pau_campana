import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileOtherAccountsComponent } from './perfile-other-accounts.component';

describe('PerfileOtherAccountsComponent', () => {
  let component: PerfileOtherAccountsComponent;
  let fixture: ComponentFixture<PerfileOtherAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfileOtherAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfileOtherAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
