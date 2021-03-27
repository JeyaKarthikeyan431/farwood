import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomManagementComponent } from './mom-management.component';

describe('MomManagementComponent', () => {
  let component: MomManagementComponent;
  let fixture: ComponentFixture<MomManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
