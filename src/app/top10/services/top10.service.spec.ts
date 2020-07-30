import { TestBed } from '@angular/core/testing';

import { Top10Service } from './top10.service';

describe('Top10Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Top10Service = TestBed.get(Top10Service);
    expect(service).toBeTruthy();
  });
});
