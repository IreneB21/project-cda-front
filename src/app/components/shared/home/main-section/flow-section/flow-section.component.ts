import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './flow-section.component.html',
  host: { 'class':'flex flex-col flex-grow' }
})
export class FlowSectionComponent {

  button = "inline-flex items-center h-10 px-10 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none";
  active = "";
  inactive = "";
}
