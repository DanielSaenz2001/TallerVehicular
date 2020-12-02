import { TestBed } from '@angular/core/testing';

import { JarwisService } from './JarwisService';

describe('JarwisService', () => {
  let service: JarwisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JarwisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
