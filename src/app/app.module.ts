import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { EventComponent } from './pages/event/event.component';
import { EllectionsComponent } from './pages/ellections/ellections.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    EventComponent,
    EllectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
