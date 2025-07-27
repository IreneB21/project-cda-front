import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { EventCardComponent } from '../../../event-card/event-card.component';
import { PublicationCardComponent } from '../../../publication-card/publication-card.component';
import { HomeService } from '../../../../../services/home.service';
import { PostMakingFormComponent } from "../../../../member/post-making-form/post-making-form.component";

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PublicationCardComponent, EventCardComponent, PostMakingFormComponent],
  templateUrl: './flow-section.component.html',
  host: { 'class':'flex flex-col flex-grow items-center' }
})
export class FlowSectionComponent {

  button = "inline-flex items-center h-10 px-10 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none";
  active = "text-black border-black dark:border-blue-400 dark:text-blue-300";
  inactive = "text-gray-500 border-transparent dark:text-gray-400 cursor-pointer hover:border-gray-400";
}
