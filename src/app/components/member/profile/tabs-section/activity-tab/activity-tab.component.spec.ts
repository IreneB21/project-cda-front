import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTabComponent } from './activity-tab.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ActivityTabComponent', () => {
  let component: ActivityTabComponent;
  let fixture: ComponentFixture<ActivityTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTabComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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
