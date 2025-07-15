import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../../services/user.service';
import { BioUpdateDto } from '../../../../models/bio-update.dto';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../../services/route.service';

@Component({
  selector: 'app-infos-visitor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './infos-visitor.component.html',
})
export class InfosVisitorComponent implements OnInit {

  @Input() isOwner!: boolean;
  
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private routeService = inject(RouteService);

  user: any;
  introductionForm: string = '';

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const profileUserId = this.routeService.getProfileUserIdFromRoute(this.route);

      if (!profileUserId) return;

      this.userService.getUserInfosForVisitor(profileUserId).subscribe((data) => {
        this.user = data;
        console.log(data)
      });
    });
  }

  get displayPseudonym(): string | null {
    return this.user?.pseudonym ? `@${this.user.pseudonym}` : null;
  }
}
