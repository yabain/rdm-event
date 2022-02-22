import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { EventComponent } from './pages/event/event.component';
import { EllectionsComponent } from './pages/ellections/ellections.component';
import { CommonModule } from '@angular/common';
import { ProgressIndeterminateModule } from './shared/components/progress-indeterminate/progress-indeterminate.module';
import { ProfilComponent } from './pages/profil/profil.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GamesComponent } from './pages/games/games.component';
import { BestScoreManager } from './pages/games/snake/snake.storage.service';
import { SnakeComponent } from './pages/games/snake/snake.component';
// import { NotificationService } from './shared/services/notification/notification.sevices';
// import { NotificationService } from './shared/services/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    EventComponent,
    EllectionsComponent,
    ProfilComponent,
    ChatComponent,
    GamesComponent,
    SnakeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProgressIndeterminateModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    // NotificationService,
    BestScoreManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
