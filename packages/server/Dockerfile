FROM node:16-alpine

WORKDIR /usr/src/app
COPY packages/server ./packages/server/
COPY packages/shared ./packages/shared/
COPY packages/frontend ./packages/frontend/
COPY package.json ./package.json
COPY lerna.json ./lerna.json
RUN yarn install
RUN npx lerna bootstrap
WORKDIR /usr/src/app/packages/frontend
RUN yarn build
WORKDIR /usr/src/app/packages/server
RUN yarn build
