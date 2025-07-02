import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from '../environments/environment';

/**
 * Configuration for MSAL authentication
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.azure.clientId,
    authority: `https://login.microsoftonline.com/${environment.azure.tenantId}`,
    redirectUri: environment.azure.redirectUri,
    postLogoutRedirectUri: environment.azure.postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
      logLevel: LogLevel.Info,
    }
  }
};

/**
 * Scopes for authentication requests
 */
export const loginRequest = {
  scopes: ['User.Read']
};

/**
 * API access scopes
 */
export const apiRequest = {
  scopes: [environment.apiScope]
};
