import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map, iif, of } from 'rxjs';

export interface AddressSuggestion {
  formatted: string;
}

@Component({
  selector: 'app-autofill-address-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutofillAddressInputComponent,
    },
  ],
  templateUrl: './autofill-address-input.component.html',
  styleUrl: './autofill-address-input.component.css'
})
export class AutofillAddressInputComponent implements ControlValueAccessor {
  private http = inject(HttpClient);

  addressControl = new FormControl('');
  suggestions: any[] = [];
  focusedIndex = -1;
  apiKey = '770c0643c64b4c979ee471a7b774bb87';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor() {
    const search$ = (value: string | null) => this.http.get<any>(
                  `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value as string)}&format=json&limit=5&apiKey=${this.apiKey}`
                ).pipe(map((res) => res.results || []));

    this.addressControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((val: string | null) => 
          iif(() => !!val && val.length >= 2, search$(val), of([]))
        ),
      )
      .subscribe((results: any) => {
        this.suggestions = results;
      });
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.suggestions.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex =
        (this.focusedIndex + 1) % this.suggestions.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex =
        (this.focusedIndex - 1 + this.suggestions.length) %
        this.suggestions.length;
    } else if (event.key === 'Enter' && this.focusedIndex >= 0) {
      event.preventDefault();
      this.select(this.suggestions[this.focusedIndex]);
    }
  }

  select(item: any) {
    this.addressControl.setValue(item.formatted, { emitEvent: false });
    this.suggestions = [];
    this.onChange(item.formatted);
  }

  writeValue(address: string): void {
    this.addressControl.setValue(address, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
