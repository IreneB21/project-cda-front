import { Component } from '@angular/core';
import { HeaderAuthentificationComponent } from '../header-authentification/header-authentification.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [HeaderAuthentificationComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

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
    console.log(this.registrationForm.value);
  }
}
