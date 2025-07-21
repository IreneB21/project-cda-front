import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { UserService } from '../../../../services/user.service';
import { BioUpdateDto } from '../../../../models/bio-update.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './infos.component.html',
})
export class InfosComponent implements OnInit {

  @Input() isOwner!: boolean;
  
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  user: any;
  isEditing: boolean = false;
  introductionForm: string = '';

  ngOnInit(): void {
    this.userService.getUserInfosById().subscribe((data) => {
      this.user = data;
    });
  }

  get displayPseudonym(): string | null {
    return this.user?.pseudonym ? `@${this.user.pseudonym}` : null;
  }

  editIntroduction() {
    this.isEditing = true;
    this.introductionForm = this.user?.introduction || '';
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveIntroduction() {
    this.user.introduction = this.introductionForm;
    const userBio: BioUpdateDto = {
      userId: this.user.id,
      body: this.introductionForm
    }
    this.isEditing = false;
    this.userService.updateIntroduction(userBio);
  }
}
