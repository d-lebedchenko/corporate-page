# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

## How Mock Mode Works

The site normally fetches all content from PayloadCMS on every request. Mock mode replaces every API call with local JSON files — a single env variable switches between the two modes.

```
Browser → Nuxt server
               ↓
       IS_NUXT_MOCK=true?
          ↙           ↘
        Yes             No
         ↓               ↓
  mocks/*.json      PayloadCMS API
  public/payload    (port 3001)
  /api/media/...
```

**`mocks/`** — JSON snapshots of all content (pages, career pages, blog posts, vacancies, globals).  
**`public/payload/api/media/`** — all media files downloaded from Payload (images, SVGs).  
**Nuxt** serves both data and assets with no external dependencies.

The snapshot is generated once by running `scripts/snapshot.mjs` against a live Payload instance. After that, Payload and PostgreSQL can be turned off entirely.

---

## Mock Mode (deploy without backend)

The site can run entirely without PayloadCMS and PostgreSQL — using static JSON snapshots and local media files.

### Running in mock mode

1. Set the env variable and build:

```bash
IS_NUXT_MOCK=true yarn build
```

2. Start the server:

```bash
IS_NUXT_MOCK=true node .output/server/index.mjs
```

Or via `.env` file:

```env
IS_NUXT_MOCK=true
NUXT_PUBLIC_BASE_URL=https://your-domain.com
NUXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

```bash
yarn build && node .output/server/index.mjs
```

> Payload and PostgreSQL can be off entirely.

---

### Refreshing content (re-snapshot)

Run while PayloadCMS is running locally (`http://localhost:3001`):

```bash
node scripts/snapshot.mjs
```

The script:
- Overwrites all JSON files in `mocks/`
- Downloads new media files to `public/payload/api/media/file/` (skips existing ones)
- Takes ~5–10 seconds

Then rebuild:

```bash
IS_NUXT_MOCK=true yarn build
```

To point at a different Payload host:

```bash
PAYLOAD_URL=http://my-payload-host:3001 node scripts/snapshot.mjs
```

---

### Rolling back to the live backend

Remove `IS_NUXT_MOCK=true` and rebuild. No code changes needed.

```bash
# 1. Make sure Payload and PostgreSQL are running
# 2. Build without the mock flag
yarn build

# 3. Start
node .output/server/index.mjs
```

> Files in `mocks/` and `public/payload/` are harmless — they are simply ignored when `IS_NUXT_MOCK` is not set.
