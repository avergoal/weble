import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserdataComponent } from './view-userdata.component';

describe('ViewUserdataComponent', () => {
  let component: ViewUserdataComponent;
  let fixture: ComponentFixture<ViewUserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
