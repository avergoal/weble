import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersNotifyComponent } from './pers-notify.component';

describe('PersNotifyComponent', () => {
  let component: PersNotifyComponent;
  let fixture: ComponentFixture<PersNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
