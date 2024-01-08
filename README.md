[![units-test](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/test.yml/badge.svg)](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/test.yml)
[![CodeQL](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/codeql.yml/badge.svg)](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/codeql.yml)

# direnv action

> Privides environment variables via direnv

This action provides environment variables via [direnv](https://direnv.net/),

## Inputs

- `direnvVersion`: The version of direnv to use. Default: `2.32.1`

## Outputs

No outputs

## Example usage

```yaml
uses: bukzor-sentryio/direnv-install@v1
with:
  direnvVersion: 2.32.1
```

This will load `.envrc` residing at the top of the repository.
