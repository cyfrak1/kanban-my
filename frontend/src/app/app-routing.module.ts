import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { DasboardPageComponent } from './pages/dashboard-page/dasboard-page/dasboard-page.component';
import { AuthGuardGuard } from './core/auth-guard.guard';

const routes: Routes = [
  { path:'login', component: LoginPageComponent },
  { path:'dashboard', component: DasboardPageComponent, canActivate: [AuthGuardGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
