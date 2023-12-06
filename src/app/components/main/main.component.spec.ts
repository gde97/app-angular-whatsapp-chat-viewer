import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInterfaceComponent } from './main.component';

describe('MainInterfaceComponent', () => {
  let component: MainInterfaceComponent;
  let fixture: ComponentFixture<MainInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainInterfaceComponent]
    });
    fixture = TestBed.createComponent(MainInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
