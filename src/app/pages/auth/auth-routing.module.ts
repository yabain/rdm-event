import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path:"auth",
    pathMatch:"full",
    component:TemplateComponent,
    children:[
      {
        path:"login",
        component:LoginComponent,
        pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
