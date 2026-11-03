FROM node:lts AS setup
WORKDIR /usr/dev
COPY . .
RUN npm install --global corepack && corepack enable && yarn install

FROM setup AS analyze
RUN yarn lint

FROM setup AS check 
RUN yarn check

FROM setup AS test
RUN yarn test

FROM setup AS build
RUN yarn build

FROM build AS release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/fashion && \
    git remote -v && \
    git checkout latest
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "ci: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "ci: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:lts-alpine AS fashion-web-install
RUN npm install -g @zthun/fashion-web

FROM nginx:bookworm AS fashion-web
COPY --from=fashion-web-install /usr/local/lib/node_modules/@zthun/fashion-web/dist/. /usr/share/nginx/html/
