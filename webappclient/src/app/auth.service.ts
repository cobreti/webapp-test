import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { Observable, Subject, filter, from, map } from 'rxjs';
import { loginRequest } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authChangedSubject = new Subject<boolean>();
  public authChanged$: Observable<boolean> = this._authChangedSubject.asObservable();

  constructor(private msalService: MsalService) {
    this.msalService.instance.addEventCallback((event: EventMessage) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
        event.eventType === EventType.SSO_SILENT_SUCCESS
      ) {
        this._authChangedSubject.next(true);
      }

      if (event.eventType === EventType.LOGOUT_SUCCESS) {
        this._authChangedSubject.next(false);
      }
    });

    this.msalService.initialize().subscribe({
      next: () => {
        const account = this.getAccount();
        if (account) {
          this._authChangedSubject.next(true);
        } else {
          this._authChangedSubject.next(false);
        }
      },
      error: (err) => {
        console.error('MSAL initialization failed', err);
        this._authChangedSubject.next(false);
      }
    });
  }

  public login(): void {
    this.msalService.loginRedirect(loginRequest);
  }

  public logout(): void {
    this.msalService.logoutRedirect();
  }

  public getAccount(): AccountInfo | null {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  }

  public isLoggedIn(): boolean {
    return this.getAccount() !== null;
  }

  public getUserProfile(): Observable<any> {
    const account = this.getAccount();
    if (!account) {
      return new Observable(observer => observer.error('User not logged in'));
    }

    const graphEndpoint = 'https://graph.microsoft.com/v1.0/me';
    return from(
      this.msalService.instance.acquireTokenSilent({
        ...loginRequest,
        account
      })
    ).pipe(
      map(response => {
        // Here you'd make an HTTP request with the token
        // For now, we'll just return some demo data
        return {
          displayName: account.name,
          email: account.username,
          id: account.localAccountId
        };
      })
    );
  }
}
