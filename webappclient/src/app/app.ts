import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { AuthService } from './auth.service';
import { LoginComponent } from './components/login/login.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { EventMessage, InteractionStatus, EventType, RedirectRequest, AuthenticationResult, InteractionType, PopupRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App extends MsalRedirectComponent {
  protected title = 'webappclient';
  isLoggedIn = false;
  loginDisplay = false;
  tokenExpiration: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private appAuthService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    super(appAuthService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.appAuthService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.inProgress$
        .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });

    this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS
          ),
          takeUntil(this._destroying$)
        )
        .subscribe((result: EventMessage) => {
          this.setLoginDisplay();
          this.checkAndSetActiveAccount();
        });

    this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
          ),
          takeUntil(this._destroying$)
        )
        .subscribe((result: EventMessage) => {
          const payload = result.payload as AuthenticationResult;
          this.appAuthService.instance.setActiveAccount(payload.account);
        });

      // Used for storing and displaying token expiration
    this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)).subscribe(msg => {
      this.tokenExpiration=  (msg.payload as any).expiresOn;
      localStorage.setItem('tokenExpiration', this.tokenExpiration);
    });


  }

  setLoginDisplay() {
    this.loginDisplay = this.appAuthService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
      /**
       * If no active account set but there are accounts signed in, sets first account to active account
       * To use active account set here, subscribe to inProgress$ first in your component
       * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
       */
      let activeAccount = this.appAuthService.instance.getActiveAccount();

      if (!activeAccount && this.appAuthService.instance.getAllAccounts().length > 0) {
        let accounts = this.appAuthService.instance.getAllAccounts();
        // add your code for handling multiple accounts here
        this.appAuthService.instance.setActiveAccount(accounts[0]);
      }
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        if (this.msalGuardConfig.authRequest) {
          this.appAuthService.loginPopup({
            ...this.msalGuardConfig.authRequest,
          } as PopupRequest)
            .subscribe((response: AuthenticationResult) => {
              this.appAuthService.instance.setActiveAccount(response.account);
            });
        } else {
          this.appAuthService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.appAuthService.instance.setActiveAccount(response.account);
            });
        }
    } else {
        if (this.msalGuardConfig.authRequest) {
          this.appAuthService.loginRedirect({
            ...this.msalGuardConfig.authRequest,
          } as RedirectRequest);
        } else {
          this.appAuthService.loginRedirect();
        }
    }
  }

  logout() {
if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        this.appAuthService.logoutPopup({
          account: this.appAuthService.instance.getActiveAccount(),
        });
      } else {
        this.appAuthService.logoutRedirect({
          account: this.appAuthService.instance.getActiveAccount(),
        });
      }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
