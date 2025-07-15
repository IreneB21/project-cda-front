import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSectionComponent } from './tabs-section.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TabsSectionComponent', () => {
  let component: TabsSectionComponent;
  let fixture: ComponentFixture<TabsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsSectionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: of({})
        }]
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
