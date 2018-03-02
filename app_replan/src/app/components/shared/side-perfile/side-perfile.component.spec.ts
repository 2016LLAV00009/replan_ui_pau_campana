import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePerfileComponent } from './side-perfile.component';

describe('SidePerfileComponent', () => {
  let component: SidePerfileComponent;
  let fixture: ComponentFixture<SidePerfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePerfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePerfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
