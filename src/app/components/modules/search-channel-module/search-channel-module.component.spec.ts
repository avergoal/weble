import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChannelModeleComponent } from './search-channel.component';

describe('SearchChannelComponent', () => {
  let component: SearchChannelModeleComponent;
  let fixture: ComponentFixture<SearchChannelModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChannelModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChannelModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
