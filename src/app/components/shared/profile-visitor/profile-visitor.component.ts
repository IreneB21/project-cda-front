import { Component } from '@angular/core';
import { InfosVisitorComponent } from './infos-visitor/infos-visitor.component';
import { ActivitySectionVisitorComponent } from './activity-section-visitor/activity-section-visitor.component';

@Component({
  selector: 'app-profile-visitor',
  imports: [InfosVisitorComponent, ActivitySectionVisitorComponent],
  templateUrl: './profile-visitor.component.html',
})
export class ProfileVisitorComponent {

  illustrationPath: string = '/ex-illustration.jpg';

}
