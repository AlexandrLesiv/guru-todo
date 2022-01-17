FROM node:16-alpine
WORKDIR /usr/src/app
COPY packages/frontend ./packages/frontend/
COPY packages/shared ./packages/shared/
COPY package.json ./package.json
COPY lerna.json ./lerna.json
RUN yarn install
RUN npx lerna bootstrap
WORKDIR /usr/src/app/packages/frontend
