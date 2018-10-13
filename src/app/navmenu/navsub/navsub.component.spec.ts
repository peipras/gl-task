import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsubComponent } from './navsub.component';

describe('NavsubComponent', () => {
  let component: NavsubComponent;
  let fixture: ComponentFixture<NavsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
