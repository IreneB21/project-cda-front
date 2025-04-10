import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofillAddressInputComponent } from './autofill-address-input.component';

describe('AutofillAddressInputComponent', () => {
  let component: AutofillAddressInputComponent;
  let fixture: ComponentFixture<AutofillAddressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutofillAddressInputComponent]
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
