import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './pages/event/event.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { MainPageTemplateComponent } from './shared/components/main-page-template/main-page-template.component';

const routes: Routes = [
  {
    path:'page',
    component:MainPageTemplateComponent,
    children:[
      {
        path:'news',
        pathMatch:'full',
        component:NewsfeedComponent
      },
      {
        path:'event',
        pathMatch:'full',
        component:EventComponent
      }

    ]
  },
  {
    path:'',
    loadChildren:()=>import("./pages/auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path: '**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
