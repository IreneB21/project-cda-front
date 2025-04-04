import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-infos-tab',
  imports: [ReactiveFormsModule],
  templateUrl: './infos-tab.component.html',
  styleUrl: './infos-tab.component.css'
})
export class InfosTabComponent implements OnInit {

  profileInfosTabForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  /* A intégrer dans ngOnInit */
  isNotificationSelected(): boolean {
    const controls = this.profileInfosTabForm.controls;
    return controls['site'].value || controls['email'].value || controls['phone'].value;
  }


  ngOnInit(): void {
    this.profileInfosTabForm = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      pseudonym: [''], 
      birthdate: [''], 
      fullAddress: ['', [Validators.required]],
      phone: [''], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isInCity: [null, [Validators.required]],
      notificationPreferences: [0],
    });
  }

  submitForm(): void {
    if (this.profileInfosTabForm.valid) {
      const formData = this.profileInfosTabForm.value;
      console.log('Données du formulaire:', formData);
      // Traitement des données ici
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
