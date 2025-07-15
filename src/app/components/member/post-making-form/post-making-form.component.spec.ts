import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMakingFormComponent } from './post-making-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostMakingFormComponent', () => {
  let component: PostMakingFormComponent;
  let fixture: ComponentFixture<PostMakingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostMakingFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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
