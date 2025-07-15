import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting  } from '@angular/common/http/testing';

import { InfosComponent } from './infos.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../../services/user.service';

describe('InfosComponent', () => {
  let component: InfosComponent;
  let fixture: ComponentFixture<InfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: of({})
        },
        {
          provide: UserService,
          useValue: {
            updateIntroduction: () => {},
            getUserInfosById: () => new Observable(),
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // const httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("isEditing is set to false when editing is canceled", function() {
    component.isEditing = true;
    component.cancelEditing();
    expect(component.isEditing).toBe(false);
  });

  it("isEditing is set to true when edit introduction", function() {
    component.isEditing = false;
    component.editIntroduction();
    expect(component.isEditing).toBe(true);
  });

  it("introductionForm is set to user introduction", function() {
    component.user = { introduction: 'introduction' };
    component.editIntroduction();
    expect(component.introductionForm).toBe('introduction');
  });

  it("introductionForm is set default value", function() {
    component.user = {};
    component.editIntroduction();
    expect(component.introductionForm).toBe('');
  });

  it("save correctly the introduction", function() {
    component.user = { id: 1 };
    component.introductionForm = 'introductionForm';
    const service = TestBed.inject(UserService);
    spyOn(service, 'updateIntroduction');

    component.saveIntroduction();

    expect(component.user.introduction).toBe('introductionForm');
    expect(component.isEditing).toBe(false);
    expect(service.updateIntroduction).toHaveBeenCalledWith({
      userId: 1,
      body: 'introductionForm'
    });
  });


});
