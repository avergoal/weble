import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatInfoComponent } from './group-chat-info.component';

describe('GroupChatInfoComponent', () => {
  let component: GroupChatInfoComponent;
  let fixture: ComponentFixture<GroupChatInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
