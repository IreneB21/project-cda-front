import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AutofillAddressInputComponent } from '../../../../shared/autofill-address-input/autofill-address-input.component';
import { UserService } from '../../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../../../services/route.service';

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
  ) {}

  /* A intégrer dans ngOnInit */
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
      isInCity: [null, [Validators.required]],
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
    });
  }

  submitForm(): void {
    if (this.profileInfosTabForm.valid) {
      const formData = this.profileInfosTabForm.value;
      this.userService.updateProfile(formData).subscribe();
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
