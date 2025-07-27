import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { PublicationCardComponent } from '../../../../publication-card/publication-card.component';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-alert-notifications',
  imports: [PublicationCardComponent],
  templateUrl: './alert-notifications.component.html',
  styleUrl: './alert-notifications.component.css'
})
export class AlertNotificationsComponent implements OnInit {
  allPosts = inject(ROUTER_OUTLET_DATA) as WritableSignal<Array<any>>;
  posts: Signal<Array<any>> = signal([]);

  ngOnInit(): void {
    this.posts = computed(() => this.allPosts().filter(post => post.category === 'ALERT'));
  }
}
