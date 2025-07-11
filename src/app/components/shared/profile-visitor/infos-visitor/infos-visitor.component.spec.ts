import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosVisitorComponent } from './infos-visitor.component';

describe('InfosVisitorComponent', () => {
  let component: InfosVisitorComponent;
  let fixture: ComponentFixture<InfosVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
