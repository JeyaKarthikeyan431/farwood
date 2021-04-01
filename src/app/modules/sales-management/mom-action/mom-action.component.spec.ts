import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomActionComponent } from './mom-action.component';

describe('MomActionComponent', () => {
  let component: MomActionComponent;
  let fixture: ComponentFixture<MomActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
