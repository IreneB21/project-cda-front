import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSectionComponent } from './side-section.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SideSectionComponent', () => {
  let component: SideSectionComponent;
  let fixture: ComponentFixture<SideSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideSectionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
