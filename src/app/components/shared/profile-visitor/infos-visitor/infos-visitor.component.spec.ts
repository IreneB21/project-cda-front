import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosVisitorComponent } from './infos-visitor.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('InfosVisitorComponent', () => {
  let component: InfosVisitorComponent;
  let fixture: ComponentFixture<InfosVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosVisitorComponent],
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

    fixture = TestBed.createComponent(InfosVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
