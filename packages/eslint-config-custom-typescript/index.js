// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	extends: [
		"typescript",
		"plugin:turbo/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"base",
	],
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			parser: "@typescript-eslint/parser",
			settings: {
				"import/parsers": {
					"@typescript-eslint/parser": [".ts", ".tsx"],
				},
			},
			rules: {
				"@typescript-eslint/no-unused-expressions": ["error"],
				"@typescript-eslint/no-explicit-any": ["error"],
				"@typescript-eslint/no-unused-vars": [
					"warn",
					{
						argsIgnorePattern: "^_",
						varsIgnorePattern: "^_",
					},
				],
				"@typescript-eslint/consistent-type-imports": "error",
			},
		},
	],
}

module.exports = config
