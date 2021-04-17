import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomViewComponent } from './mom-view.component';

describe('MomViewComponent', () => {
  let component: MomViewComponent;
  let fixture: ComponentFixture<MomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
