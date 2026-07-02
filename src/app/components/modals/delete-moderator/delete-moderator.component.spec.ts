import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModeratorComponent } from './delete-moderator.component';

describe('DeleteModeratorComponent', () => {
  let component: DeleteModeratorComponent;
  let fixture: ComponentFixture<DeleteModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
