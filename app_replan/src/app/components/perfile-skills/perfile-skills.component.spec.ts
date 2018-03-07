import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileSkillsComponent } from './perfile-skills.component';

describe('PerfileSkillsComponent', () => {
  let component: PerfileSkillsComponent;
  let fixture: ComponentFixture<PerfileSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfileSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfileSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
