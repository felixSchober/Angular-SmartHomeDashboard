import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetContainerDataUpdateComponent } from './widget-container-data-update.component';

describe('WidgetContainerDataUpdateComponent', () => {
  let component: WidgetContainerDataUpdateComponent;
  let fixture: ComponentFixture<WidgetContainerDataUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetContainerDataUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetContainerDataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
