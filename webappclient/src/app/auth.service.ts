import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { Observable, Subject, filter, from, map } from 'rxjs';
import { loginRequest } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

}
