import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BirthdayAlertComponent } from "./components/birthday-alert/birthday-alert.component";
import { CalendarInteractWidgetComponent } from "./components/calendar-interact-widget/calendar-interact-widget.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { FeedActivityComponent } from "./components/feed-activity/feed-activity.component";
import { FriendSuggestionComponent } from "./components/friend-suggestion/friend-suggestion.component";
import { LeftSideMenuComponent } from "./components/left-side-menu/left-side-menu.component";
import { MainPageTemplateComponent } from "./components/main-page-template/main-page-template.component";
import { NewNewsfeedFormComponent } from "./components/new-newsfeed-form/new-newsfeed-form.component";
import { NewsfeedListComponent } from "./components/newsfeed-list/newsfeed-list.component";
import { PageYouMayLikeComponent } from "./components/page-you-may-like/page-you-may-like.component";
import { PreloaderComponent } from "./components/preloader/preloader.component";
import { RightSideMenuListFriendComponent } from "./components/right-side-menu-list-friend/right-side-menu-list-friend.component";
import { TopHeaderMenuComponent } from "./components/top-header-menu/top-header-menu.component";
import { WeatherComponent } from "./components/weather/weather.component";
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { EllectHeadComponent } from './components/ellect-head/ellect-head.component';
import { CandidatsListComponent } from './components/candidats-list/candidats-list.component';
import { FormNewEventComponent } from "./components/form-new-event/form-new-event.component";
import { TodayEventBreadcrumbComponent } from './components/today-event-breadcrumb/today-event-breadcrumb.component';
import { ProgressIndeterminateModule } from "./components/progress-indeterminate/progress-indeterminate.module";
import { UploaderChoiseImageFileComponent } from './components/uploader-choise-image-file/uploader-choise-image-file.component';
import { GaleryImageComponent } from './components/galery-image/galery-image.component';
import { ShowVoteCandidatureDetailsComponent } from './components/show-vote-candidature-details/show-vote-candidature-details.component';
import { ShowModalDetailsEventComponent } from './components/show-modal-details-event/show-modal-details-event.component';
import { NewsfeedItemComponent } from './components/newsfeed-item/newsfeed-item.component';
import { EventActionListComponent } from './components/event-action-list/event-action-list.component';
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { AccountSettingComponent } from "./components/account-setting/account-setting.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { NotifSettingComponent } from "./components/notif-setting/notif-setting.component";



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
    NewsfeedListComponent,
    CalendarInteractWidgetComponent,
    HeaderPageComponent,
    EllectHeadComponent,
    CandidatsListComponent,
    FormNewEventComponent,
    TodayEventBreadcrumbComponent,
    UploaderChoiseImageFileComponent,
    GaleryImageComponent,
    ShowVoteCandidatureDetailsComponent,
    ShowModalDetailsEventComponent,
    NewsfeedItemComponent,
    EventActionListComponent,
    UserInfoComponent,
    AccountSettingComponent,
    ChangePasswordComponent,
    NotifSettingComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressIndeterminateModule,
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
    NewsfeedListComponent,
    CalendarInteractWidgetComponent,
    HeaderPageComponent,
    EllectHeadComponent,
    CandidatsListComponent,
    FormNewEventComponent,
    TodayEventBreadcrumbComponent,
    UploaderChoiseImageFileComponent,
    ProgressIndeterminateModule,
    ShowVoteCandidatureDetailsComponent,
    ShowModalDetailsEventComponent,
    NewsfeedItemComponent,

  ],
  providers:[
  ]
})
export class SharedModule { }
