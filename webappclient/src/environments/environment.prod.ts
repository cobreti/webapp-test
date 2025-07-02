// Define client ID separately to avoid circular reference
const clientId = '{{AZURE_CLIENT_ID}}'; // Will be replaced during build

export const environment = {
  production: true,
  azure: {
    clientId: clientId,
    tenantId: '{{AZURE_TENANT_ID}}', // Will be replaced during build
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  apiBaseUrl: 'https://dtwebapptest.azurewebsites.net',
  apiScope: `api://${clientId}/access_as_user` // Typically uses the clientId as part of the scope
};
