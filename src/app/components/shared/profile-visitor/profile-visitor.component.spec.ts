import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitorComponent } from './profile-visitor.component';

describe('ProfileVisitorComponent', () => {
  let component: ProfileVisitorComponent;
  let fixture: ComponentFixture<ProfileVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
