import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { InfosTabComponent } from './infos-tab/infos-tab.component';
import { NotificationsTabComponent } from './notifications-tab/notifications-tab.component';

@Component({
  selector: 'app-tabs-section',
  imports: [CommonModule, ActivityTabComponent, InfosTabComponent, NotificationsTabComponent],
  templateUrl: './tabs-section.component.html',
  styleUrl: './tabs-section.component.css'
})
export class TabsSectionComponent {

  selectedTab: string = 'informations';

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
