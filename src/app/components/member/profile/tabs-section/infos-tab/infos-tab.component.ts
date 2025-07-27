import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AutofillAddressInputComponent } from '../../../../shared/autofill-address-input/autofill-address-input.component';
import { UserService } from '../../../../../services/user.service';
import { RouteService } from '../../../../../services/route.service';
import { ProfileUpdateDto } from '../../../../../models/profile-update.dto';

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
    private userService: UserService,
    private route: ActivatedRoute,
    private routeService: RouteService
  ) { }

  isNotificationSelected(): boolean {
    const controls = this.profileInfosTabForm.controls;
    return controls['site'].value || controls['email'].value || controls['phone'].value;
  }

  ngOnInit(): void {
    const profileUserId = this.routeService.getProfileUserIdFromRoute(this.route);
    const connectedUserId = sessionStorage.getItem('userId');

    this.profileInfosTabForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/)]],
      pseudonym: ['', [Validators.pattern(/^[a-zA-Z0-9_.-]{3,20}$/)]],
      birthdate: [''],
      fullAddress: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)]],
      isInCity: [<boolean><unknown>null, [Validators.required]],
      notificationPreferences: [0],
    });

    this.userService.getUserInfosById().subscribe(userInfos => {
      this.profileInfosTabForm.patchValue({
        lastname: userInfos.lastname,
        firstname: userInfos.firstname,
        pseudonym: userInfos.pseudonym,
        birthdate: userInfos.birthdate,
        fullAddress: `${userInfos.street} ${userInfos.postalCode} ${userInfos.city}`,
        isInCity: userInfos.isInCity,
        phone: userInfos.phone,
        email: userInfos.email,
      })

      console.log(userInfos);
      console.log("Type isInCity:", typeof userInfos.isInCity, userInfos.isInCity);

    });
  }

  submitForm(): void {
    if (this.profileInfosTabForm.valid) {
      const formValues = this.profileInfosTabForm.value;
      const addressParts = formValues.fullAddress.trim().split(/\s+/);
      const postalCodeIndex = addressParts.findIndex((part: string) => /^\d{5}$/.test(part));

      const street = addressParts.slice(0, postalCodeIndex).join(' ');
      const postalCode = addressParts[postalCodeIndex];
      const city = addressParts.slice(postalCodeIndex + 1).join(' ');

      const storedUserId = sessionStorage.getItem('userId');

      if (!storedUserId) {
        console.error("Aucun ID utilisateur trouvé dans la session.");
        return;
      }

      const userId = Number(storedUserId);

      const payload: ProfileUpdateDto = {
        userId,
        lastname: formValues.lastname,
        firstname: formValues.firstname,
        pseudonym: formValues.pseudonym,
        password: formValues.password,
        email: formValues.email,
        city,
        postalCode,
        street,
        isInCity: formValues.isInCity,
        birthdate: formValues.birthdate,
        phone: formValues.phone,
      };

      this.userService.updateProfile(payload).subscribe({
        next: () => console.log('Profil mis à jour avec succès.'),
        error: err => console.error('Erreur lors de la mise à jour :', err)
      });
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
