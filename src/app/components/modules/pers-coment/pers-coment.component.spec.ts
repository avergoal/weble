import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersComentComponent } from './pers-coment.component';

describe('PersComentComponent', () => {
  let component: PersComentComponent;
  let fixture: ComponentFixture<PersComentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersComentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
