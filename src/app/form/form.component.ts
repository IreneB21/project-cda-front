import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
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