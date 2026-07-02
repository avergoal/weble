import { TestBed } from '@angular/core/testing';

import { Device.CameraService } from './device.camera.service';

describe('Device.CameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Device.CameraService = TestBed.get(Device.CameraService);
    expect(service).toBeTruthy();
  });
});
