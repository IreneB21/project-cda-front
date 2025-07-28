import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { FlowSectionComponent } from './main-section/flow-section/flow-section.component';
import { SideSectionComponent } from './main-section/side-section/side-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlowSectionComponent, SideSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { 'class': 'bg-gray-100 flex flex-grow p-5 pt-3' }
})
export class HomeComponent implements OnInit {

  private homeService = inject(HomeService);

  posts: Array<any> = [];
  lastEvents: Array<any> = [];

  ngOnInit(): void {
    this.homeService.getNearbyposts();
    this.homeService.allPosts$.subscribe(data => {this.posts = data.sort((post1, post2) => { 
        const date1 = "category" in post1 ? new Date(post1.publicationDate).valueOf() : new Date(post1.creationDate).valueOf();
        const date2 = "category" in post2 ? new Date(post2.publicationDate).valueOf() : new Date(post2.creationDate).valueOf();
       
        return date2 - date1;
      });
      console.log(this.posts);
    }
    );
  }

  onPostAdded(event: any) {
    this.posts.unshift(event);
  }
}
