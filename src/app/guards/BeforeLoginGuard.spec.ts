import { TestBed } from '@angular/core/testing';

import { BeforeLoginGuard } from './BeforeLoginGuard';

describe('BeforeLoginGuard', () => {
  let guard: BeforeLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BeforeLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
