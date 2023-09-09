# Shared Packages Directory

## How to use packages in your application

#### #1 For normal way

1. Add the package name to the `package.json` file in your application:

```json
	"dependencies": {
		"PACKAGE_NAME": "workspace:*", // or "workspace:^"

		// Example
		"eslint-config-custom-typescript": "workspace:*",
		"tsconfig": "workspace:*",
	}
```

2. Run `pnpm install` to install the package. pnpm will automatically create a symlink to the package in
   the`node_modules` directory of your application.

#### #2 For CLI lovers

Run `pnpm add` with the package name like this, it will automatically add the package to the `package.json` file
andsymlink in the `node_modules` directory of your application:

```sh
$ pnpm add {{PACKAGE_NAME}} --filter {{YOUR_APPLICATION_NAME}}

# Example
$ pnpm add eslint-config-custom-typescript --filter web-server
```

#### #3 Create your own way

Go to below link and learn it:

- https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages
- https://turbo.build/repo/docs/handbook/sharing-code/internal-packages
