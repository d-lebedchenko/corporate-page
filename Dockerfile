ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine AS builder

ARG NUXT_PUBLIC_PAYLOAD_URL
ARG NUXT_PUBLIC_BASE_URL
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/package.json .

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
