import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

import { HeaderAuthentificationComponent } from '../../shared/header-authentification/header-authentification.component';
import { AuthService } from '../../../services/auth.service';
import { RegistrationDto } from '../../../models/registration.dto';
import { AddressSuggestion, AutofillAddressInputComponent } from '../../shared/autofill-address-input/autofill-address-input.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderAuthentificationComponent, ReactiveFormsModule, AutofillAddressInputComponent, CommonModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  host: { 'class':'flex-grow' }
})
export class SignupComponent {

  constructor(private authService: AuthService, private router: Router) {}

  registrationForm = new FormGroup({
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/)
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/)
    ]),
    pseudonym: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9_.-]{3,20}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern(/^.{5,100}$/)
    ]),
    residence: new FormControl('ville', [
      Validators.required
    ])
  });

  imageUrl: string = 'assets/pictures/registration-illustration.jpg';

  submitForm() {
    const formValue = this.registrationForm.value;

    const address = formValue.address ?? '';
    const { street, city, postalCode } = this.splitAddress(address);
    const avatars: Array<string> = [
      '/avatar1.jpg',
      '/avatar2.jpg',
      '/avatar3.jpg',
      '/avatar4.jpg'
    ];

    const registrationData: RegistrationDto = {
      lastname: formValue.lastname ?? '',
      firstname: formValue.firstname ?? '',
      pseudonym: formValue.pseudonym ?? '',
      password: formValue.password ?? '',
      email: formValue.email ?? '',
      roleName: 'USER',
      street,
      city,
      postalCode,
      picture: avatars[Math.floor(Math.random() * avatars.length)],
      isInCity: formValue.residence === 'ville'
    };

    this.authService.register(registrationData).subscribe({
      next: (data) => {
        this.router.navigate(['/hello/neighbors/login']); 
      },
      error: err => console.error('Erreur inscription :', err)
    });
  }

  private splitAddress(address: string): { street: string; city: string; postalCode: string } {
    const postalCodeRegex = /\b\d{5}\b/;
    const match = address.match(postalCodeRegex);
  
    if (match) {
      const postalCode = match[0];
      const parts = address.replace(postalCode, '').trim().split(/\s+/);
      const postalCodeIndex = address.indexOf(postalCode);
      
      const before = address.substring(0, postalCodeIndex).trim();
      const after = address.substring(postalCodeIndex + postalCode.length).trim();
  
      let street = before;
      let city = after;
  
      if (!city && parts.length > 0) {
        city = parts.slice(-1)[0];
      }
  
      return {
        street,
        postalCode,
        city
      };
    }
  
    console.warn('Adresse non reconnue :', address);
    return { street: '', postalCode: '', city: '' };
  }
}
