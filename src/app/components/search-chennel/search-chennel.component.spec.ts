import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChennelComponent } from './search-chennel.component';

describe('SearchChennelComponent', () => {
  let component: SearchChennelComponent;
  let fixture: ComponentFixture<SearchChennelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChennelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChennelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
