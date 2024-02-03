# eslint-config

> Shared [Eslint config](https://eslint.org/) for my projects

## Install

```bash
yarn add -DE @devshareacademy/eslint-config
```

**Note:** In order to use the package, you will need to have the peer dependencies that are listed installed in your project. You can add these dependencies by running the following command:

```bash
yarn add -D -E eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier
```

### Install Via GitHub NPM Packages

You can install this package from the GitHub NPM Package Repository. In order to do this, you must first authenticate with GitHub packages. You can read more about this process here: [GitHub - Installing A GitHub Package](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

```bash
yarn config set @lookio:registry https://npm.pkg.github.com/
echo "//npm.pkg.github.com/:_authToken=<github_personal_access_token>" > .npmrc
yarn add -DE @devshareacademy/eslint-config
```

## Usage

`.eslintrc`

```json
{
  "root": true,
  "extends": "@devshareacademy/eslint-config",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {}
}
```

## Publish New Version

```bash
# Authenticate with NPM Package Registry
npm login

# Run publish script
yarn publish:npm
yarn publish:github
```

---

## Shared Configurations

- @devshareacademy/eslint-config: [eslint-config](https://github.com/devshareacademy/eslint-config)
- @devshareacademy/tsconfig: [tsconfig](https://github.com/devshareacademy/tsconfig)
- @devshareacademy/prettier-config: [prettier-config](https://github.com/devshareacademy/prettier-config)
