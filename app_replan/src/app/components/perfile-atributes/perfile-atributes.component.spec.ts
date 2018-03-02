import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileAtributesComponent } from './perfile-atributes.component';

describe('PerfileAtributesComponent', () => {
  let component: PerfileAtributesComponent;
  let fixture: ComponentFixture<PerfileAtributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfileAtributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfileAtributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
