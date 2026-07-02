import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModalCreateComponent } from './view-modal-create.component';

describe('ViewModalCreateComponent', () => {
  let component: ViewModalCreateComponent;
  let fixture: ComponentFixture<ViewModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
