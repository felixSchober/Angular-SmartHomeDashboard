import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetContainerActionsComponent } from './widget-container-actions.component';

describe('WidgetContainerActionsComponent', () => {
  let component: WidgetContainerActionsComponent;
  let fixture: ComponentFixture<WidgetContainerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetContainerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetContainerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
