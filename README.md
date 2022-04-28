# Policy Bot for Google Maps Repositories

[![npm](https://img.shields.io/npm/v/@googlemaps/github-policy-bot)](https://www.npmjs.com/package/@googlemaps/github-policy-bot)
![Test](https://github.com/googlemaps/js-github-policy-bot/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/js-github-policy-bot/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/js-github-policy-bot/branch/main/graph/badge.svg)](https://codecov.io/gh/googlemaps/js-github-policy-bot)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/js-github-policy-bot?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)](https://discord.gg/jRteCzP)

## Description

This package provides a command line tool for enforcing policies on GitHub repositories and initializing files to meet the requirements of these policies.

### `check`

```sh
npx @googlemaps/github-policy-bot \
  check DIRECTORY_OF_PROJECT
```

The tool performs checks beyond the minimal required for Google Open Source including specific files around GitHub processes, bots, and workflows.

### `init`

```sh
npx @googlemaps/github-policy-bot \
  init DIRECTORY_OF_PROJECT \
  --users GITHUB_USERNAME GITHUB_USERNAME2 \ # for blunderbuss and CODEOWNERS
  --team googlemaps/eng \ # for CODEOWNERS
  --repository js-github-policy-bot \
  --kind js \ # should match prefix of repository
  --no-overwrite
```

Which will output the following:

```
- Writing file: README.md
- Writing file: SECURITY.md
- Writing file: .github/blunderbuss.yml
- Writing file: .github/CODEOWNERS
- Writing file: .github/workflows/codeql.yml
- Writing file: .github/workflows/test.yml
- Writing file: .github/workflows/release.yml
```

For more information run:

```sh
npx @googlemaps/github-policy-bot help init
```

It is recommended to adjust the generated files before committing them to the repository. The templates for these files are defined at https://github.com/googlemaps/js-github-policy-bot/tree/main/src/init/templates.
