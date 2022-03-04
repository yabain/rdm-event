import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { EllectionsComponent } from './pages/ellections/ellections.component';
import { EventComponent } from './pages/event/event.component';
import { GamesComponent } from './pages/games/games.component';
import { SnakeComponent } from './pages/games/snake/snake.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AccountSettingComponent } from './shared/components/account-setting/account-setting.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { MainPageTemplateComponent } from './shared/components/main-page-template/main-page-template.component';
import { NotifSettingComponent } from './shared/components/notif-setting/notif-setting.component';
import { UpdateUserInfosComponent } from './shared/components/update-user-infos/update-user-infos.component';
import { UserInfoComponent } from './shared/components/user-info/user-info.component';

const routes: Routes = [
  {
    path:'page',
    component:MainPageTemplateComponent,
    children:[
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full',
      },
      {
        path:'news',
        pathMatch:'full',
        component:NewsfeedComponent
      },
      {
        path:'chat',
        pathMatch:'full',
        component:ChatComponent
      },
      {
        path:'games',
        pathMatch:'full',
        component:GamesComponent
      },
      {
        path:'snake',
        pathMatch:'full',
        component:SnakeComponent
      },
      {
        path:'profil',
        component:ProfilComponent,
        children:[
          {
            path: '',
            redirectTo: 'user-info',
            pathMatch: 'full',
          },
          {
            path: 'change-pass',
            component: ChangePasswordComponent,
          },
          {
            path: 'account-setting',
            component: AccountSettingComponent,
          },
          {
            path: 'notif-setting',
            component: NotifSettingComponent,
          },
          {
            path: 'user-info',
            component: UpdateUserInfosComponent,
          },
          {
            path: '**',
            component: UpdateUserInfosComponent,
          }

        ]
      },
      {
        path:'event',
        pathMatch:'full',
        component:EventComponent
      },
      {
        path: 'ellection/:idEvent',
        children: [
          {
            path: '**',
            component: EllectionsComponent,
          }
        ]
      },
    ]
  },
  {
    path:'**',
    loadChildren:()=>import("./pages/auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path: '',
    redirectTo:'page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
