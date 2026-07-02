import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSetingFotoComponent } from './set-seting-foto.component';

describe('SetSetingFotoComponent', () => {
  let component: SetSetingFotoComponent;
  let fixture: ComponentFixture<SetSetingFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSetingFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSetingFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
