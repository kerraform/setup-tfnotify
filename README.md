<a href="https://github.com/kekkoga">
    <img src="https://avatars.githubusercontent.com/u/82173916?s=200&v=4" alt="Kerraform logo" title="Terraform" align="right" height="80" />
</a>

# setup-tfnotify
[![CI][CI]][CI-status]
[![GitHub Marketplace][MarketPlace]][MarketPlace-status]
[![Mergify Status][mergify-status]][mergify]

A GitHub Action that provision [kerraform/tfnotify](https://github.com/kerraform/tfnotify) in your GitHub Action workflow

## Usage

This is just an example to show one way in which this action can be used.

```yml
on: pull_request
jobs:
  auto-merge:
    - name: Install tfnotify
      uses: kerraform/setup-tfnotify@v1
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `tag` | tfnotify version | `latest` |

### Action outputs

| Name | Description | 
| --- | --- | 
| `asset-id` | Installed asset ID | 
| `asset-name` | Install asset name |
| `tag` | Installed tag |

## License

[MIT](LICENSE)

<!-- Badge links -->
[CI]: https://github.com/KeisukeYamashita/auto-pull-request-merge/workflows/build-test/badge.svg
[CI-status]: https://github.com/KeisukeYamashita/auto-pull-request-merge/actions?query=workflow%3Abuild-test

[MarketPlace]: https://img.shields.io/badge/Marketplace-Auto%20Pull%20Request%20Merge-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=
[MarketPlace-status]: https://github.com/marketplace/actions/auto-pull-request-merge-merge

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/KeisukeYamashita/auto-pull-request-merge&style=flat
