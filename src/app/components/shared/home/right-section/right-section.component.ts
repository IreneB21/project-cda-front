import { Component } from '@angular/core';
import { FlowSectionComponent } from './flow-section/flow-section.component';
import { SideSectionComponent } from './side-section/side-section.component';

@Component({
  selector: 'app-right-section',
  imports: [FlowSectionComponent, SideSectionComponent],
  templateUrl: './right-section.component.html',
  styleUrl: './right-section.component.css'
})
export class RightSectionComponent {

}
