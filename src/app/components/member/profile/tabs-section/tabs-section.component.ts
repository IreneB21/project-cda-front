import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabs-section',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './tabs-section.component.html',
  styleUrl: './tabs-section.component.css'
})
export class TabsSectionComponent {
  button = "inline-flex items-center h-10 lg:px-15 px-3 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ";
  active = "text-black border-black dark:border-blue-400 dark:text-blue-300";
  inactive = "text-gray-500 border-transparent dark:text-gray-400 cursor-pointer hover:border-gray-400";
}
