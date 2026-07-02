import { TestBed } from '@angular/core/testing';

import { ModerateService } from './moderate.service';

describe('ModerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModerateService = TestBed.get(ModerateService);
    expect(service).toBeTruthy();
  });
});
