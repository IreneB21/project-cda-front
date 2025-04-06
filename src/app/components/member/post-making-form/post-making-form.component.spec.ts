import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMakingFormComponent } from './post-making-form.component';

describe('PostMakingFormComponent', () => {
  let component: PostMakingFormComponent;
  let fixture: ComponentFixture<PostMakingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostMakingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMakingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
