import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsViweComponent } from './tags-viwe.component';

describe('TagsViweComponent', () => {
  let component: TagsViweComponent;
  let fixture: ComponentFixture<TagsViweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsViweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsViweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
