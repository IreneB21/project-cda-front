import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTabComponent } from './activity-tab.component';

describe('ActivityTabComponent', () => {
  let component: ActivityTabComponent;
  let fixture: ComponentFixture<ActivityTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
