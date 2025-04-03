import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosTabComponent } from './infos-tab.component';

describe('InfosTabComponent', () => {
  let component: InfosTabComponent;
  let fixture: ComponentFixture<InfosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
