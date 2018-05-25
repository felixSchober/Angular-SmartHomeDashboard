import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStatusComponent } from './widget-status.component';

describe('WidgetStatusComponent', () => {
  let component: WidgetStatusComponent;
  let fixture: ComponentFixture<WidgetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
