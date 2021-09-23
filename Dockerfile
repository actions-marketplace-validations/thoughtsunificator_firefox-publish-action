FROM node:16-alpine
COPY github-action-src /github/firefox-publish-action-src
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
