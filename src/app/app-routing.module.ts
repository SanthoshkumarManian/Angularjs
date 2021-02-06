import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Form} from './form/form.component';
import { Login } from './login/login.component';
import {ListView} from './listView/list.component';
const routes: Routes = [
  {path:"addUser" ,component:Form},
  {path:"login",component:Login},
  {path :"" , component:ListView},
  {path:"addUser/:id",component:Form}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
