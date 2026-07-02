import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHashTagsComponent } from './create-hash-tags.component';

describe('CreateHashTagsComponent', () => {
  let component: CreateHashTagsComponent;
  let fixture: ComponentFixture<CreateHashTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHashTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHashTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
