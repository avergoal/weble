import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwichAccountComponent } from './swich-account.component';

describe('SwichAccountComponent', () => {
  let component: SwichAccountComponent;
  let fixture: ComponentFixture<SwichAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwichAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwichAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
