#!/bin/sh -l

mkdir firefox-publish-action-src
cp -r /github/firefox-publish-action-src .
cp --parents $INPUT_ZIP firefox-publish-action-src

cd firefox-publish-action-src

npm install
node index.js
