import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetClockComponent } from './widget-clock.component';

describe('WidgetClockComponent', () => {
  let component: WidgetClockComponent;
  let fixture: ComponentFixture<WidgetClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
