import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelRulesComponent } from './channel-rules.component';

describe('ChannelRulesComponent', () => {
  let component: ChannelRulesComponent;
  let fixture: ComponentFixture<ChannelRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
