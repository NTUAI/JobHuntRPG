# prettier-config

> Shared [prettier config](https://prettier.io/docs/en/configuration.html#sharing-configurations) for my projects

## Install

```bash
yarn add -DE @devshareacademy/prettier-config
```

### Install Via GitHub NPM Packages

You can install this package from the GitHub NPM Package Repository. In order to do this, you must first authenticate with GitHub packages. You can read more about this process here: [GitHub - Installing A GitHub Package](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

```bash
yarn config set @lookio:registry https://npm.pkg.github.com/
echo "//npm.pkg.github.com/:_authToken=<github_personal_access_token>" > .npmrc
yarn add -DE @devshareacademy/prettier-config
```

## Usage

`package.json`

```json
{
  "name": "some-package-name",
  "prettier": "@devshareacademy/prettier-config"
}
```

If you want to extend the configuration, or not place in the `package.json`, you can place the configuration in one of the supported prettier configuration file formats. Example:

`.prettierrc.js`

```javascript
module.exports = {
  ...require("@devshareacademy/prettier-config"),
  semi: false,
};
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
config: [prettier-config](https://github.com/scottwestover/prettier-config)
