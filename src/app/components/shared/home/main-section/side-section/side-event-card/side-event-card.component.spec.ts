import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideEventCardComponent } from './side-event-card.component';

describe('SideEventCardComponent', () => {
  let component: SideEventCardComponent;
  let fixture: ComponentFixture<SideEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideEventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
