# commitlint-plugin-workspace-scopes

[![GitHub license](https://img.shields.io/github/license/Liquid-JS/commitlint-plugin-workspace-scopes.svg)](https://github.com/Liquid-JS/commitlint-plugin-workspace-scopes/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/@liquid-js/commitlint-plugin-workspace-scopes.svg)](https://www.npmjs.com/package/@liquid-js/commitlint-plugin-workspace-scopes)
[![scope](https://img.shields.io/npm/v/@liquid-js/commitlint-plugin-workspace-scopes.svg)](https://www.npmjs.com/package/@liquid-js/commitlint-plugin-workspace-scopes)

A `commitlint` plugin to discover workspace packages as scopes.

## Installation

    npm install @liquid-js/commitlint-plugin-workspace-scopes

## API Documentation

<https://liquid-js.github.io/commitlint-plugin-workspace-scopes/>

## Usage

To configure that only workspace-packages are accepted scopes:

```json
{
    "plugins": [
        "@liquid-js/commitlint-plugin-workspace-scopes"
    ],
    "rules": {
        "scope-enum": [
            2,
            "always",
            {}
        ]
    }
}
```

To configure that workspace-packages and `codeowners` are accepted scopes:

```json
{
    "plugins": [
        "@liquid-js/commitlint-plugin-workspace-scopes"
    ],
    "rules": {
        "scope-enum": [
            2,
            "always",
            {
                "extra": [
                    "codeowners"
                ]
            }
        ]
    }
}
```

To strip namespace prefix from workspace packages:

```json
{
    "plugins": [
        "@liquid-js/commitlint-plugin-workspace-scopes"
    ],
    "rules": {
        "scope-enum": [
            2,
            "always",
            {
                "stripPrefix": [
                    "@my-org/"
                ]
            }
        ]
    }
}
```

## Examples

    $ cat .commitlintrc.json

    {
        "extends": [
            "@commitlint/config-conventional"
        ],
        "plugins": [
            "@liquid-js/commitlint-plugin-workspace-scopes"
        ],
        "rules": {
            "scope-enum": [
                2,
                "always",
                [
                    "codeowners"
                ]
            ]
        }
    }

    $ tree packages

    packages
    ├── api
    ├── app
    └── web

    $ echo "feat(api): this will succeed" | npx commitlint --verbose
    ⧗   input: feat(api): this will succeed
    ✔   found 0 problems, 0 warnings

    $ echo "feat(codeowners): this will succeed" | npx commitlint --verbose
    ⧗   input: feat(codeowners): this will succeed
    ✔   found 0 problems, 0 warnings

    $ echo "feat(foo): this will fail" | npx commitlint --verbose
    ⧗   input: feat(foo): this will fail
    ✖   scope must be one of [api, app, web] [scope-enum]
    ✖   found 1 problems, 0 warnings

## License

[MIT License](https://github.com/Liquid-JS/commitlint-plugin-workspace-scopes/blob/master/LICENSE)
