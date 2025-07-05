import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent, canActivate: [MsalGuard] },
  { path: '.auth/login/aad/callback', component: AuthCallbackComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
