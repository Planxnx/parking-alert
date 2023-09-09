// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	extends: [
		"turbo",
		"plugin:turbo/recommended",
		"plugin:you-dont-need-lodash-underscore/compatible-warn",
		"plugin:prettier/recommended",
	],
	plugins: ["turbo", "import", "unused-imports", "autofix", "prettier"],
	parserOptions: {
		ecmaVersion: 2022,
	},
	overrides: [
		{
			files: "*.json",
			parser: "jsonc-eslint-parser",
			rules: {},
		},
	],
	ignorePatterns: ["dist/", "node_modules/", ".turbo/"],
	rules: {
		"prettier/prettier": "error",
		"autofix/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				ignoreRestSiblings: true,
				destructuredArrayIgnorePattern: "^_",
			},
		],
		"import/order": [
			"error",
			{
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				pathGroups: [
					{
						pattern: "react",
						group: "external",
						position: "before",
					},
					{
						pattern: "next/**",
						group: "external",
					},
					{
						pattern: "@*/**",
						group: "internal",
					},
				],
				pathGroupsExcludedImportTypes: ["react"],
				groups: ["external", "builtin", "internal", "index", "sibling", "parent", "object", "type"],
				"newlines-between": "always",
			},
		],
		"unused-imports/no-unused-imports": "error",
	},
}

module.exports = config
