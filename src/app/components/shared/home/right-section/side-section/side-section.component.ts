import { Component, OnInit } from '@angular/core';
import { SideEventCardComponent } from './side-event-card/side-event-card.component';
import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';

@Component({
  selector: 'app-side-section',
  standalone: true,
  imports: [SideEventCardComponent, PostMakingFormComponent],
  templateUrl: './side-section.component.html',
  styleUrl: './side-section.component.css'
})
export class SideSectionComponent {

}
