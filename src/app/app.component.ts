import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { 'class':'min-h-screen flex flex-col' }
})
export class AppComponent {
  title = 'project-cda-front';
}
