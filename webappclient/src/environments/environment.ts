// Define client ID separately to avoid circular reference
const clientId = '{{DEV_AZURE_CLIENT_ID}}';

export const environment = {
  production: false,
  azure: {
    clientId: clientId,
    tenantId: '{{DEV_AZURE_TENANT_ID}}',
    redirectUri: `${window.location.origin}/.auth/login/aad/callback`,
    postLogoutRedirectUri: window.location.origin,
  },
  apiBaseUrl: 'https://localhost:7201',
  apiScope: `api://${clientId}/access_as_user`
};
