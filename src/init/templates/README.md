# TODO

{% if kind == 'js'%}[![npm](https://img.shields.io/npm/v/@googlemaps/github-policy-bot)](https://www.npmjs.com/package/@googlemaps/{{ repos}}){% endif %}
![Test](https://github.com/googlemaps/{{ repository }}/workflows/Build/badge.svg)
![Release](https://github.com/googlemaps/{{ repository }}/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/{{ repository }}/branch/main/graph/badge.svg)](https://codecov.io/gh/googlemaps/{{ repository }})
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/{{ repository }}?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)](https://discord.gg/jRteCzP)

## Description

TODO

## Install

{% if kind == 'js'%}
```js
npm i @googlemaps/{{ repository | replace("js-", "")}}
```
{% endif %}

## Example

TODO

```
```