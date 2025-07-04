const fs = require('fs');
const path = require('path');

// Path to environment files
const devEnvPath = path.join(__dirname, 'webappclient/src/environments/environment.ts');
const prodEnvPath = path.join(__dirname, 'webappclient/src/environments/environment.prod.ts');

console.log('path : ', devEnvPath);

// Function to restore placeholders in a file
function restorePlaceholders(filePath, isProduction) {
  console.log(`Restoring placeholders in ${filePath}`);

  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    const prefix = isProduction ? '' : 'DEV_';

    // Replace actual values with placeholders
    // Using a pattern that finds clientId and tenantId values
    content = content.replace(
      /const clientId = ['"]([^'"]+)['"]/,
      `const clientId = '{{${prefix}AZURE_CLIENT_ID}}'`
    );

    content = content.replace(
      /tenantId: ['"]([^'"]+)['"]/,
      `tenantId: '{{${prefix}AZURE_TENANT_ID}}'`
    );

    // Make sure we don't modify the redirectUri format
    if (content.includes('redirectUri:') && !content.includes('/.auth/login/aad/callback')) {
      content = content.replace(
        /redirectUri: window\.location\.origin/,
        `redirectUri: \`\${window.location.origin}/.auth/login/aad/callback\``
      );
    }

    // Write the content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`✓ Placeholders restored in ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error restoring placeholders in ${path.basename(filePath)}:`, error);
  }
}

// Restore placeholders in both environment files
restorePlaceholders(devEnvPath, false);
restorePlaceholders(prodEnvPath, true);

console.log('Environment files reset to placeholders successfully!');
