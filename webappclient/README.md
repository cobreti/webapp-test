# Webappclient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Environment Configuration

This project uses environment variables to secure sensitive information like Azure AD credentials. Here's how to set it up:

1. Create a `.env` file in the project root (copy from `.env.example`)
2. Add your Azure AD credentials:
   ```
   DEV_AZURE_CLIENT_ID=your-client-id
   DEV_AZURE_TENANT_ID=your-tenant-id
   ```

### Managing Environment Files

The project includes two special scripts to handle environment variables:

- `npm run update-env` - Replaces placeholders in environment files with values from `.env`
- `npm run reset-env` - Restores placeholders in environment files (run before committing)
- `npm run prepare-commit` - Prepares code for commit by restoring placeholders

These scripts run automatically when you use standard npm commands:
- `npm start` - Automatically updates environment before starting the dev server
- `npm run build` - Automatically updates environment before building
- `npm run build:dotnet` - Updates environment before building for .NET deployment

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
