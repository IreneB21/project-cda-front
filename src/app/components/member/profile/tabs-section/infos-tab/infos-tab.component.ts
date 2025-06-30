import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressSuggestion, AutofillAddressInputComponent } from '../../../../shared/autofill-address-input/autofill-address-input.component';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-infos-tab',
  standalone: true,
  imports: [ReactiveFormsModule, AutofillAddressInputComponent],
  templateUrl: './infos-tab.component.html',
  styleUrl: './infos-tab.component.css'
})
export class InfosTabComponent implements OnInit {

  profileInfosTabForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

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

    this.userService.getUserInfos().subscribe(userInfos => {
      this.profileInfosTabForm.patchValue({
        lastname: userInfos.lastname,
        firstname: userInfos.firstname,
        pseudonym: userInfos.pseudonym,
        birthdate: userInfos.birthdate,
        fullAddress: `${userInfos.street}, ${userInfos.postalCode} ${userInfos.city}`,
        isInCity: userInfos.isInCity,
        phpne: userInfos.phone,
      })
    });
  }

  onAddressSelected(event: any) {
      const selected = event as AddressSuggestion;
      this.profileInfosTabForm.get('fullAddress')?.setValue(selected.formatted);
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
