import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNumberComponent } from './widget-number.component';

describe('WidgetNumberComponent', () => {
  let component: WidgetNumberComponent;
  let fixture: ComponentFixture<WidgetNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
