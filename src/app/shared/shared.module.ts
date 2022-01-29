import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { LeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { RightSideMenuListFriendComponent } from './right-side-menu-list-friend/right-side-menu-list-friend.component';
import { TopHeaderMenuComponent } from './top-header-menu/top-header-menu.component';
import { MainPageTemplateComponent } from './main-page-template/main-page-template.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PageYouMayLikeComponent } from './page-you-may-like/page-you-may-like.component';
import { BirthdayAlertComponent } from './birthday-alert/birthday-alert.component';
import { FriendSuggestionComponent } from './friend-suggestion/friend-suggestion.component';
import { FeedActivityComponent } from './feed-activity/feed-activity.component';
import { NewNewsfeedFormComponent } from './new-newsfeed-form/new-newsfeed-form.component';
import { NewsfeedListComponent } from './newsfeed-list/newsfeed-list.component';



@NgModule({
  declarations: [
    PreloaderComponent,
    LeftSideMenuComponent,
    RightSideMenuListFriendComponent,
    TopHeaderMenuComponent,
    MainPageTemplateComponent,
    WeatherComponent,
    CalendarComponent,
    PageYouMayLikeComponent,
    BirthdayAlertComponent,
    FriendSuggestionComponent,
    FeedActivityComponent,
    NewNewsfeedFormComponent,
    NewsfeedListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PreloaderComponent,
    LeftSideMenuComponent,
    RightSideMenuListFriendComponent,
    TopHeaderMenuComponent,
    WeatherComponent,
    CalendarComponent, 
    PageYouMayLikeComponent,
    BirthdayAlertComponent,
    FriendSuggestionComponent,
    FeedActivityComponent,
    NewNewsfeedFormComponent,
    NewsfeedListComponent
  ]
})
export class SharedModule { }
