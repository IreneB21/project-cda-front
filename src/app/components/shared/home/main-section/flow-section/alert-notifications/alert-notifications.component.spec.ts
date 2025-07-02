import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationsComponent } from './alert-notifications.component';

describe('AlertNotificationsComponent', () => {
  let component: AlertNotificationsComponent;
  let fixture: ComponentFixture<AlertNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
