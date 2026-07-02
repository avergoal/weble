import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTimeModalComponent } from './filter-time-modal.component';

describe('FilterTimeModalComponent', () => {
  let component: FilterTimeModalComponent;
  let fixture: ComponentFixture<FilterTimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
