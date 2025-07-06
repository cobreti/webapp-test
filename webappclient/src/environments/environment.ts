// Define client ID separately to avoid circular reference
const clientId = '2d5492f9-e028-4915-b470-9dcee2d85e9d';

export const environment = {
  production: false,
  azure: {
    clientId: clientId,
    tenantId: '19e74276-cc08-479a-a8e3-9e7ac8a6f03c',
    redirectUri: `${window.location.origin}/.auth/login/aad/callback`,
    postLogoutRedirectUri: window.location.origin,
  },
  apiBaseUrl: 'https://localhost:7201',
  apiScope: `api://${clientId}/access_as_user`
};
