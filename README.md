# firefox-publish-action

Github Action to publish browser extension using the [Firefox Signing API v4](https://addons-server.readthedocs.io/en/latest/topics/api/v4_frozen/auth.html)

> :warning: **Your extension needs to be published to be able to use this action**

## How to get API credentials

https://addons.mozilla.org/en-US/developers/addon/api/key/

## Inputs

## `firefox-jwt-issuer`

JWT Issuer

## `firefox-jwt-secret`

JWT Secret

## `firefox-guid`

Addon UUID (including the opening and closing brackets {}) or the extension identifier (yourextension@domain)

## `zip`

Input file

## `firefox-manifest`

Manifest location

## Usage

```yaml
uses: thoughtsunificator/firefox-publish-action@master
with:
  zip: build/your-extension.zip
  firefox-jwt-issuer: ${{ secrets.FIREFOX_JWT_ISSUER }}
  firefox-jwt-secret: ${{ secrets.FIREFOX_JWT_SECRET }}
  firefox-guid: ${{ secrets.FIREFOX_GUID }}
  firefox-manifest: public/manifest.json
```
