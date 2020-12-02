import { TestBed } from '@angular/core/testing';

import { PropietarioService } from './PropietarioService';

describe('PropietarioServiceService', () => {
  let service: PropietarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropietarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
