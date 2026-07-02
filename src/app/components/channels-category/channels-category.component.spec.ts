import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsCategoryComponent } from './channels-category.component';

describe('ChannelsCategoryComponent', () => {
  let component: ChannelsCategoryComponent;
  let fixture: ComponentFixture<ChannelsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
