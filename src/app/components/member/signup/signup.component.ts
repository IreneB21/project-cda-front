import { Component } from '@angular/core';
import { HeaderAuthentificationComponent } from '../../shared/header-authentification/header-authentification.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RegistrationDto } from '../../../models/registration.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderAuthentificationComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthService, private router: Router) {}

  registrationForm = new FormGroup({
    lastname: new FormControl(''),
    firstname: new FormControl(''),
    pseudonym: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    residence: new FormControl('ville'), // Par défaut sur "ville"
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
    ]

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
        sessionStorage.setItem('token', data.accessToken);
        this.router.navigate(['/hello/neighbors/login']); 
      },
      error: err => console.error('Erreur inscription :', err)
    });
  }

  private splitAddress(address: string): { street: string; city: string; postalCode: string } {
    const regex = /^(.+),\s*(\d{5})\s+(.+)$/;
    const match = address.match(regex);
  
    if (match) {
      return {
        street: match[1],
        postalCode: match[2],
        city: match[3]
      };
    }
    return { street: '', postalCode: '', city: '' };
  }
}
