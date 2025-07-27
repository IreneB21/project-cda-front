import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PublicationCardComponent } from "../../../../publication-card/publication-card.component";

@Component({
  selector: 'app-help-notifications',
  imports: [PublicationCardComponent],
  templateUrl: './help-notifications.component.html',
  styleUrl: './help-notifications.component.css'
})
export class HelpNotificationsComponent implements OnInit {
  allPosts = inject(ROUTER_OUTLET_DATA) as WritableSignal<Array<any>>;
  posts: Signal<Array<any>> = signal([]);

  ngOnInit(): void {
    this.posts = computed(() => this.allPosts().filter(post => post.category === 'HELP'));
  }
}
