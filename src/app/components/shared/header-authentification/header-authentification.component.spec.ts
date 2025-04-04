import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthentificationComponent } from './header-authentification.component';

describe('HeaderAuthentificationComponent', () => {
  let component: HeaderAuthentificationComponent;
  let fixture: ComponentFixture<HeaderAuthentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAuthentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
