import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCardComponent } from './publication-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PublicationCardComponent', () => {
  let component: PublicationCardComponent;
  let fixture: ComponentFixture<PublicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
