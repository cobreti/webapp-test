import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

/**
 * Configuration for MSAL authentication
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: '2d5492f9-e028-4915-b470-9dcee2d85e9d', // Replace with your Azure AD application client ID
    authority: 'https://login.microsoftonline.com/19e74276-cc08-479a-a8e3-9e7ac8a6f03c', // Replace with your tenant ID
    redirectUri: window.location.origin, // Will use the current URL as the redirect URI
    postLogoutRedirectUri: window.location.origin,
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
  scopes: ['api://YOUR_API_SCOPE/access_as_user'] // Replace with your API scope
};
