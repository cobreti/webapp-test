import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, from, mergeMap, switchMap } from 'rxjs';
import { apiRequest } from './auth-config';

export const msalInterceptor: HttpInterceptorFn = (req, next) => {
  const msalService = inject(MsalService);

  // Skip interceptor for certain URLs
  const isApiRequest = req.url.includes('/api/') || req.url.includes('graph.microsoft.com');
  if (!isApiRequest) {
    return next(req);
  }

  const account = msalService.instance.getAllAccounts()[0] as AccountInfo;
  if (!account) {
    return next(req);
  }

  return from(
    msalService.instance.acquireTokenSilent({
      ...apiRequest,
      account
    })
  ).pipe(
    switchMap(authResult => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authResult.accessToken}`
        }
      });
      return next(authReq);
    })
  );
};
