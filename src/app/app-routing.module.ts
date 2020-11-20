import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpDetailsComponent } from './employee/emp-details/emp-details.component';
import { EmpListComponent } from './employee/emp-list/emp-list.component';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './spinner/spinner.component';
const routes: Routes = [
  {path:'', redirectTo: 'login',pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'spinner', component:SpinnerComponent},



  {path:'emp-list', component:EmpListComponent,canActivate:[AuthGuard]},
  {path:'emp-details', component:EmpDetailsComponent,canActivate:[AuthGuard]},
  {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
