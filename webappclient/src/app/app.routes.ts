import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
