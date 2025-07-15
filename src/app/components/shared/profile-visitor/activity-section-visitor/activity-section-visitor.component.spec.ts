import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySectionVisitorComponent } from './activity-section-visitor.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ActivitySectionVisitorComponent', () => {
  let component: ActivitySectionVisitorComponent;
  let fixture: ComponentFixture<ActivitySectionVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySectionVisitorComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: of({})
        }
      ],
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
