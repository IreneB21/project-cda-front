import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { EventCardComponent } from "../../../../event-card/event-card.component";

@Component({
  selector: 'app-event-notifications',
  imports: [EventCardComponent],
  templateUrl: './event-notifications.component.html',
  styleUrl: './event-notifications.component.css'
})
export class EventNotificationsComponent implements OnInit {
  allPosts = inject(ROUTER_OUTLET_DATA) as WritableSignal<Array<any>>;
  posts: Signal<Array<any>> = signal([]);

  ngOnInit(): void {
    this.posts = computed(() => this.allPosts().filter(post => !post.category));
  }
}
