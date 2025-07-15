import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitorComponent } from './profile-visitor.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfileVisitorComponent', () => {
  let component: ProfileVisitorComponent;
  let fixture: ComponentFixture<ProfileVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileVisitorComponent],
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

    fixture = TestBed.createComponent(ProfileVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
