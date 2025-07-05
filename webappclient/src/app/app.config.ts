import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { MsalModule, MsalService, MsalGuard } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { msalInterceptor } from './msal-interceptor';

console.log('value1: ', msalConfig.auth.clientId);
console.log('value2: ', msalConfig.auth.authority);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([msalInterceptor])),
    importProvidersFrom(
      MsalModule.forRoot(
        new PublicClientApplication(msalConfig),
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['user.read']
          }
        },
        {
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map([
            ['https://graph.microsoft.com/v1.0/me', ['user.read']],
            // Add your API URL and scopes here
          ])
        }
      )
    ),
    MsalService,
    MsalGuard
  ]
};
