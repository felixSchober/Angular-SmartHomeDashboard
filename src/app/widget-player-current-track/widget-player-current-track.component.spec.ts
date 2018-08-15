import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPlayerCurrentTrackComponent } from './widget-player-current-track.component';

describe('WidgetPlayerCurrentTrackComponent', () => {
  let component: WidgetPlayerCurrentTrackComponent;
  let fixture: ComponentFixture<WidgetPlayerCurrentTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPlayerCurrentTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPlayerCurrentTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
