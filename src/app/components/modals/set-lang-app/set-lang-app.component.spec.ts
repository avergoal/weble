import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLangAppComponent } from './set-lang-app.component';

describe('SetLangAppComponent', () => {
  let component: SetLangAppComponent;
  let fixture: ComponentFixture<SetLangAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLangAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLangAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
