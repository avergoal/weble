import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserdataEditComponent } from './view-userdata-edit.component';

describe('ViewUserdataEditComponent', () => {
  let component: ViewUserdataEditComponent;
  let fixture: ComponentFixture<ViewUserdataEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserdataEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserdataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
