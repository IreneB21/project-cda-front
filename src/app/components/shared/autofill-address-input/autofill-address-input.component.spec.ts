import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofillAddressInputComponent } from './autofill-address-input.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AutofillAddressInputComponent', () => {
  let component: AutofillAddressInputComponent;
  let fixture: ComponentFixture<AutofillAddressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutofillAddressInputComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutofillAddressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
