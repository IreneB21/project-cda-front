import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSectionComponent } from './tabs-section.component';

describe('TabsSectionComponent', () => {
  let component: TabsSectionComponent;
  let fixture: ComponentFixture<TabsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
