import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicationCreateDto } from '../../../models/publication-create.dto';
import { PublicationService } from '../../../services/publication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-making-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-making-form.component.html',
  styleUrl: './post-making-form.component.css'
})
export class PostMakingFormComponent {  

  private formBuilder = inject(FormBuilder);

  constructor(private publicationService: PublicationService, private router: Router) {}

  publicationTypes = [
    { label: 'information', id: "INFO" },
    { label: 'alerte', id: "ALERT" },
    { label: 'conseil', id: "RECOMMANDATION" },
    { label: 'question', id: "QUESTION" },
    { label: 'aide', id: "HELP" },
    { label: 'évènement', id: "EVENT" },
  ];

  postMakingForm = this.formBuilder.group({
    publicationType: ['', Validators.required],
    startDate: [''],
    endDate: [''],
    maxCapacity: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    localisation: [''],
    illustrations: [''],
  });

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

    if (formValue.publicationType != "EVENT") {
      const publicationData: PublicationCreateDto = {
        title: formValue.title ?? '',
        city: city ?? '',
        zipCode: postalCode ?? '',
        street: street ?? '',
        description: formValue.description ?? '',
        illustrations: [],
        authorId: 1,
        category: formValue.publicationType ?? '',
      }

      console.log("Nouvelle publication : " + publicationData);

      this.publicationService.savePublication(publicationData).subscribe({
        next: (data) => {
          console.log(data);
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