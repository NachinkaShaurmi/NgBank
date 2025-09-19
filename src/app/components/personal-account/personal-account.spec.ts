import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAccount } from './personal-account';

describe('PersonalAccount', () => {
  let component: PersonalAccount;
  let fixture: ComponentFixture<PersonalAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
