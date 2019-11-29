import { TestBed } from '@angular/core/testing';

import { ExtractJsonService } from './extract-json.service';

describe('ExtractJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtractJsonService = TestBed.get(ExtractJsonService);
    expect(service).toBeTruthy();
  });
});
