[![test](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/test.yaml/badge.svg)](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/test.yaml)
[![CodeQL](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/codeql.yml/badge.svg)](https://github.com/bukzor-sentryio/direnv-install/actions/workflows/codeql.yml)

# direnv install

> Privides a direnv binary

This action provides a binary of [direnv](https://direnv.net/),

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

This will _not_ load any `.envrc` file.

## Supported platforms and architectures

After v1.0.7, the following platforms and architectures are supported.

| Platform | Architecture |
| -------- | ------------ |
| Linux    | x86_64       |
| Linux    | arm64        |
| Darwin   | x86_64       |
| Darwin   | arm64        |

version below v1.0.7, only `linux-x86_64` is supported.

## Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/bukzor-sentryio>
            <img src=https://avatars.githubusercontent.com/u/580053?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Kim SeungSu/>
            <br />
            <sub style="font-size:14px"><b>Kim SeungSu</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/hopisaurus>
            <img src=https://avatars.githubusercontent.com/u/24846639?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=hopisaurus/>
            <br />
            <sub style="font-size:14px"><b>hopisaurus</b></sub>
        </a>
    </td>
</tr>
</table>
