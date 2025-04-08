import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { BioUpdateDto } from '../../../../models/bio-update.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent implements OnInit {
  
  private userService = inject(UserService);

  user: any;
  isEditing: boolean = false;
  introductionForm: string = '';

  ngOnInit(): void {
    this.userService.getUserInfos().subscribe((data) => {
      this.user = data;
    });
  }

  get displayPseudonym(): string | null {
    return this.user.pseudonym ? `@${this.user.pseudonym}` : null;
  }

  editIntroduction() {
    this.isEditing = true;
    this.introductionForm = this.user.introduction || '';
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveIntroduction() {
    //this.user.introduction = this.introductionForm;
    const userBio: BioUpdateDto = {
      userId: this.user.id,
      bio: this.introductionForm
    }
    this.isEditing = false;
    this.userService.updateIntroduction(userBio);
  }
}
