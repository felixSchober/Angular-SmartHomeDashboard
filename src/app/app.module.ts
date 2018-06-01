import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './material-module/material-module';
import { AppComponent } from './app.component';
import { ControlPageComponent } from './control-page/control-page.component';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { WidgetNumberComponent } from './widget-number/widget-number.component';
import { WidgetTextComponent } from './widget-text/widget-text.component';
import { WidgetImageComponent } from './widget-image/widget-image.component';
import { WidgetClockComponent } from './widget-clock/widget-clock.component';
import { WidgetGraphComponent } from './widget-graph/widget-graph.component';

import { Utils } from './utils';
import { WidgetStatusComponent } from './widget-status/widget-status.component';
import { WidgetImageStatusComponent } from './widget-image-status/widget-image-status.component';
import { WidgetContainerActionsComponent } from './widget-container-actions/widget-container-actions.component';
import { WidgetContainerDataUpdateComponent } from './widget-container-data-update/widget-container-data-update.component';
import { WidgetSwitchComponent } from './widget-switch/widget-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPageComponent,
    WidgetContainerComponent,
    WidgetNumberComponent,
    WidgetTextComponent,
    WidgetImageComponent,
    WidgetClockComponent,
    WidgetGraphComponent,
    WidgetStatusComponent,
    WidgetImageStatusComponent,
    WidgetContainerActionsComponent,
    WidgetContainerDataUpdateComponent,
    WidgetSwitchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [Utils],
  bootstrap: [AppComponent]
})
export class AppModule { }
