import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNotificationsComponent } from './info-notifications.component';

describe('InfoNotificationsComponent', () => {
  let component: InfoNotificationsComponent;
  let fixture: ComponentFixture<InfoNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
