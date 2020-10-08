import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarynComponent } from './nav-baryn.component';

describe('NavBarynComponent', () => {
  let component: NavBarynComponent;
  let fixture: ComponentFixture<NavBarynComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarynComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarynComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
