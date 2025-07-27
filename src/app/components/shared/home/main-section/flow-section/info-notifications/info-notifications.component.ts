import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PublicationCardComponent } from "../../../../publication-card/publication-card.component";

@Component({
  selector: 'app-info-notifications',
  imports: [PublicationCardComponent],
  templateUrl: './info-notifications.component.html',
  styleUrl: './info-notifications.component.css'
})
export class InfoNotificationsComponent implements OnInit {
  allPosts = inject(ROUTER_OUTLET_DATA) as WritableSignal<Array<any>>;
  posts: Signal<Array<any>> = signal([]);

  ngOnInit(): void {
    this.posts = computed(() => this.allPosts().filter(post => post.category === 'INFO'));
  }
}
