import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { DasboardPageComponent } from './pages/dashboard-page/dasboard-page/dasboard-page.component';
import { AuthGuardService } from './core/services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path:'login', component: LoginPageComponent },
  { path:'dashboard', component: DasboardPageComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
