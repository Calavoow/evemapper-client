import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {AuthGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {
    path: 'map',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        enableTracing: true
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
