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

@NgModule({
  declarations: [
    AppComponent,
    ControlPageComponent,
    WidgetContainerComponent,
    WidgetNumberComponent,
    WidgetTextComponent,
    WidgetImageComponent,
    WidgetClockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
