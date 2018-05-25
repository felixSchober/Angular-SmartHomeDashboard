import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetImageStatusComponent } from './widget-image-status.component';

describe('WidgetImageStatusComponent', () => {
  let component: WidgetImageStatusComponent;
  let fixture: ComponentFixture<WidgetImageStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetImageStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetImageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
