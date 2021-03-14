import { TestBed } from '@angular/core/testing';

import { CommonToastrService } from './common-toastr.service';

describe('CommonToastrService', () => {
  let service: CommonToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
