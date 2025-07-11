import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySectionVisitorComponent } from './activity-section-visitor.component';

describe('ActivitySectionVisitorComponent', () => {
  let component: ActivitySectionVisitorComponent;
  let fixture: ComponentFixture<ActivitySectionVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySectionVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySectionVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
