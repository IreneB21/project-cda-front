import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, map } from 'rxjs';

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

  @Input() placeholder = "Adresse complète";
  @Output() addressSelected = new EventEmitter<AddressSuggestion>();

  addressCtrl = new FormControl('');
  suggestions: any[] = [];
  focusedIndex = -1;
  apiKey = '770c0643c64b4c979ee471a7b774bb87';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor() {
    this.addressCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((val): val is string => !!val && val.length >= 2),
        switchMap((value) =>
          this.http
            .get<any>(
              `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                value
              )}&format=json&limit=5&apiKey=${this.apiKey}`
            )
            .pipe(map((res) => res.results || []))
        )
      )
      .subscribe((results) => {
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
    this.addressCtrl.setValue(item.formatted);
    this.suggestions = [];
    this.addressSelected.emit({ formatted: item.formatted });
    this.onChange(item.formatted);
  }

  writeValue(obj: any): void {
    this.addressCtrl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
