import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetGraphComponent } from './widget-graph.component';

describe('WidgetGraphComponent', () => {
  let component: WidgetGraphComponent;
  let fixture: ComponentFixture<WidgetGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
