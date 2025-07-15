import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowSectionComponent } from './flow-section.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FlowSectionComponent', () => {
  let component: FlowSectionComponent;
  let fixture: ComponentFixture<FlowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowSectionComponent],
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

    fixture = TestBed.createComponent(FlowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
