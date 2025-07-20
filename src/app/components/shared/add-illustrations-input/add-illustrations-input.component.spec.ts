import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIllustrationsInputComponent } from './add-illustrations-input.component';

describe('AddIllustrationsInputComponent', () => {
  let component: AddIllustrationsInputComponent;
  let fixture: ComponentFixture<AddIllustrationsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIllustrationsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIllustrationsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
