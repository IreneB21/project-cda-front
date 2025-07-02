import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotificationsComponent } from './event-notifications.component';

describe('EventNotificationsComponent', () => {
  let component: EventNotificationsComponent;
  let fixture: ComponentFixture<EventNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
