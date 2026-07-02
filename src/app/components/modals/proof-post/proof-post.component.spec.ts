import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofPostComponent } from './proof-post.component';

describe('ProofPostComponent', () => {
  let component: ProofPostComponent;
  let fixture: ComponentFixture<ProofPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProofPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
