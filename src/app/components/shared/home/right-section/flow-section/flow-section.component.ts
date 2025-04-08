import { Component, inject, OnInit } from '@angular/core';
import { PublicationComponent } from '../../../../member/publication/publication.component';
import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';
import { HomeService } from '../../../../../services/home.service';

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [PublicationComponent, PostMakingFormComponent],
  templateUrl: './flow-section.component.html'
})
export class FlowSectionComponent implements OnInit {

  private homeService = inject(HomeService);

  posts!: Array<Object>;

  ngOnInit(): void {
    this.homeService.getAllPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    })
  }
}
