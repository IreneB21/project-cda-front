import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosTabComponent } from './infos-tab.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('InfosTabComponent', () => {
  let component: InfosTabComponent;
  let fixture: ComponentFixture<InfosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosTabComponent],
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

    fixture = TestBed.createComponent(InfosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
