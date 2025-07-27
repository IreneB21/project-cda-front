import { Component, inject, Input, OnInit, Signal, WritableSignal } from '@angular/core';
import { PublicationCardComponent } from '../../../../publication-card/publication-card.component';
import { EventCardComponent } from '../../../../event-card/event-card.component';
import { HomeService } from '../../../../../../services/home.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-all-notifications',
  imports: [PublicationCardComponent, EventCardComponent],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent implements OnInit {

  private homeService = inject(HomeService);
  posts = inject(ROUTER_OUTLET_DATA) as WritableSignal<Array<any>>;

  ngOnInit(): void {}
}
