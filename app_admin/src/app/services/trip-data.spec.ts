import { TestBed } from '@angular/core/testing';

import { TripDataServices } from './trip-data';

describe('TripData', () => {
  let service: TripDataServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripDataServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});