import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignRequirementComponent } from './design-requirement.component';

describe('DesignRequirementComponent', () => {
  let component: DesignRequirementComponent;
  let fixture: ComponentFixture<DesignRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
