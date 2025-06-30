import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowSectionComponent } from './flow-section.component';

describe('FlowSectionComponent', () => {
  let component: FlowSectionComponent;
  let fixture: ComponentFixture<FlowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
