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
  private userId = sessionStorage.getItem("userId");

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

    if (formValue.publicationType != "EVENT") {
      const publicationData: PublicationCreateDto = {
        title: formValue.title ?? '',
        city: city ?? '',
        zipCode: postalCode ?? '',
        street: street ?? '',
        description: formValue.description ?? '',
        illustrations: this.uploadedImageUrls,
        authorId: Number(this.userId),
        category: formValue.publicationType ?? '',
      }

      console.log("Nouvelle publication : " + publicationData);

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