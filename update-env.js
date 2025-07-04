const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Get the environment file path
const environmentFilePath = path.join(__dirname, 'webappclient/src/environments/environment.ts');

// Read the file
let content = fs.readFileSync(environmentFilePath, 'utf8');

// Replace placeholders with environment variables
content = content.replace(/{{DEV_AZURE_CLIENT_ID}}/g, process.env.DEV_AZURE_CLIENT_ID || '');
content = content.replace(/{{DEV_AZURE_TENANT_ID}}/g, process.env.DEV_AZURE_TENANT_ID || '');

// Write the updated content back to the file
fs.writeFileSync(environmentFilePath, content);

console.log('Development environment file updated with Azure AD credentials');
