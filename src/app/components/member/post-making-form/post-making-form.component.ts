import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { PublicationCreateDto } from '../../../models/publication-create.dto';
import { PublicationService } from '../../../services/publication.service';
import { EventCreateDto } from '../../../models/event-create.dto';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-post-making-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './post-making-form.component.html',
  styleUrl: './post-making-form.component.css'
})
export class PostMakingFormComponent implements OnInit {  

  private formBuilder = inject(FormBuilder);
  private userId = sessionStorage.getItem("userId");

  constructor(
    private publicationService: PublicationService, 
    private eventService: EventService,
    private router: Router
  ) {}

  publicationTypes = [
    { label: 'information', id: "INFO" },
    { label: 'alerte', id: "ALERT" },
    { label: 'conseil', id: "RECOMMANDATION" },
    { label: 'question', id: "QUESTION" },
    { label: 'aide', id: "HELP" },
    { label: 'évènement', id: "EVENT" },
  ];

  private dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startDate')?.value;
    const end = control.get('endDate')?.value;
  
    if (start && end && new Date(start) >= new Date(end)) {
      return { invalidDateRange: true };
    }
  
    return null;
  };

  postMakingForm = this.formBuilder.group({
    publicationType: ['', Validators.required],
    startDate: [''],
    endDate: [''],
    maxCapacity: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    localisation: ['', Validators.required],
    illustrations: [''],
  }, { validators: this.dateRangeValidator });

  ngOnInit(): void {
    this.postMakingForm.get('publicationType')?.valueChanges.subscribe((type) => {
      const startDateControl = this.postMakingForm.get('startDate');
      const endDateControl = this.postMakingForm.get('endDate');
  
      if (type === 'EVENT') {
        startDateControl?.addValidators(Validators.required);
        endDateControl?.addValidators(Validators.required);
      } else {
        startDateControl?.clearValidators();
        endDateControl?.clearValidators();
      }
  
      startDateControl?.updateValueAndValidity();
      endDateControl?.updateValueAndValidity();
    });
  }

  selectedFiles: File[] = [];
  cloudName = 'dghkyleie';
  uploadPreset = 'hello_neighbors_upload_preset';
  uploadedImageUrls: string[] = [];

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
  
      files.forEach(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);
  
        fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          this.uploadedImageUrls.push(data.secure_url);
        })
        .catch(err => {
          console.error('Erreur upload Cloudinary:', err);
        });
      });
    }
  }  

  reset() {
    /*
    this.postMakingForm = {
      publicationType: '',
      startDate: '',
      endDate: '',
      maxCapacity: '',
      title: '',
      description: '',
      localisation: '',
      illustrations: '',
    };*/
  }

  onSubmit() {
    const formValue = this.postMakingForm.value;
    const address = formValue.localisation ?? '';
    const { street, city, postalCode } = this.splitAddress(address);

    if (formValue.publicationType === "EVENT") {
      if (!formValue.startDate || !formValue.endDate) {
        alert("Les dates de début et de fin sont requises pour un événement.");
        return;
      }

      const eventData: EventCreateDto = {
        title: formValue.title ?? '',
        city: city ?? '',
        postalCode: postalCode ?? '',
        street: street ?? '',
        startDate: `${formValue.startDate}T00:00:00`,
        endDate: `${formValue.endDate}T00:00:00`,
        description: formValue.description ?? '',
        illustrations: this.uploadedImageUrls,
        authorId: Number(this.userId)
      };

      console.log("Nouvel événement :", eventData);

      this.eventService.saveEvent(eventData).subscribe({
        next: (data) => {
          console.log("Événement enregistré :", data);
          window.location.reload();
        },
        error: (err) => {
          console.error("Erreur création événement :", err);
        }
      });

    } else {
      const publicationData: PublicationCreateDto = {
        title: formValue.title ?? '',
        city: city ?? '',
        zipCode: postalCode ?? '',
        street: street ?? '',
        description: formValue.description ?? '',
        illustrations: this.uploadedImageUrls,
        authorId: Number(this.userId),
        category: formValue.publicationType ?? '',
      };

      console.log("Nouvelle publication : " + JSON.stringify(publicationData));

      this.publicationService.savePublication(publicationData).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        }
      });
    }
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