import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessagesComponent } from './view-messages.component';

describe('ViewMessagesComponent', () => {
  let component: ViewMessagesComponent;
  let fixture: ComponentFixture<ViewMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMessagesComponent]
    });
    fixture = TestBed.createComponent(ViewMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
