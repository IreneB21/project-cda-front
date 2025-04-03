import { Component } from '@angular/core';
import { InfosComponent } from './infos/infos.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TabsSectionComponent } from './tabs-section/tabs-section.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InfosComponent, NavbarComponent, TabsSectionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  illustrationPath: string = '/ex-illustration.jpg';

  /*
  updateIllustration(event: any) {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.illustrationPath = e.target.result; // Mettre à jour l'image affichée
      };
      reader.readAsDataURL(file); // Convertir l'image en base64 pour l'afficher immédiatement
    }
  }
    */
}
