#!/usr/bin/env node

import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const MOCKS_DIR = resolve(ROOT, 'mocks')
const PUBLIC_PAYLOAD_DIR = resolve(ROOT, 'public', 'payload')
const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3001'
const LOCALES = ['uk', 'en']

const allMediaUrls = new Set()

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`)
  return res.json()
}

function collectMediaUrls(obj) {
  if (!obj || typeof obj !== 'object') return
  const values = Array.isArray(obj) ? obj : Object.values(obj)
  for (const val of values) {
    if (typeof val === 'string' && val.startsWith('/api/media/')) {
      allMediaUrls.add(val)
    } else if (val && typeof val === 'object') {
      collectMediaUrls(val)
    }
  }
}

async function saveMock(filePath, data) {
  const abs = resolve(MOCKS_DIR, `${filePath}.json`)
  await ensureDir(dirname(abs))
  await writeFile(abs, JSON.stringify(data, null, 2))
  collectMediaUrls(data)
  console.log(`  ✓ ${filePath}.json`)
}

async function fetchAllSlugs(collection) {
  const url = `${PAYLOAD_URL}/api/${collection}?limit=1000&select[slug]=true`
  const res = await fetchJson(url)
  return (res?.docs || []).map(d => d.slug).filter(Boolean)
}

async function fetchDoc(collection, slug, locale, depth = 1) {
  const url = `${PAYLOAD_URL}/api/${collection}?locale=${locale}&depth=${depth}&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`
  const res = await fetchJson(url)
  return res?.docs?.[0] || null
}

async function main() {
  await ensureDir(MOCKS_DIR)
  await ensureDir(PUBLIC_PAYLOAD_DIR)

  console.log('\n📦 Globals...')
  for (const locale of LOCALES) {
    for (const name of ['header', 'footer', 'blog-main-page', 'vacancies-main']) {
      const data = await fetchJson(`${PAYLOAD_URL}/api/globals/${name}?locale=${locale}&depth=1`)
      await saveMock(`globals/${name}-${locale}`, data)
    }
  }

  console.log('\n📄 Pages...')
  const pageSlugs = await fetchAllSlugs('pages')
  console.log(`  Found ${pageSlugs.length} page(s): ${pageSlugs.join(', ')}`)
  for (const locale of LOCALES) {
    for (const slug of pageSlugs) {
      const doc = await fetchDoc('pages', slug, locale, 1)
      if (doc) await saveMock(`pages/${slug}-${locale}`, doc)
      else console.warn(`  ⚠ pages/${slug}-${locale} — not found`)
    }
  }

  console.log('\n💼 Career pages...')
  const careerSlugs = await fetchAllSlugs('career-pages')
  console.log(`  Found ${careerSlugs.length} career page(s): ${careerSlugs.join(', ')}`)
  for (const locale of LOCALES) {
    for (const slug of careerSlugs) {
      const doc = await fetchDoc('career-pages', slug, locale, 1)
      if (doc) await saveMock(`career-pages/${slug}-${locale}`, doc)
      else console.warn(`  ⚠ career-pages/${slug}-${locale} — not found`)
    }
  }

  console.log('\n📝 Blog post lists...')
  for (const locale of LOCALES) {
    let page = 1
    let hasNextPage = true
    while (hasNextPage) {
      const url = `${PAYLOAD_URL}/api/blog-posts?locale=${locale}&depth=1&page=${page}&limit=6&sort=-publishedAt` +
        `&select[slug]=true&select[title]=true&select[description]=true` +
        `&select[image]=true&select[categories]=true&select[publishedAt]=true`
      const data = await fetchJson(url)
      await saveMock(`blog-posts/list-${page}-${locale}`, data)
      hasNextPage = data?.hasNextPage === true
      page++
    }
  }

  console.log('\n📰 Blog posts (individual)...')
  const blogSlugs = await fetchAllSlugs('blog-posts')
  console.log(`  Found ${blogSlugs.length} post(s)`)
  for (const locale of LOCALES) {
    for (const slug of blogSlugs) {
      const doc = await fetchDoc('blog-posts', slug, locale, 2)
      if (doc) await saveMock(`blog-posts/${slug}-${locale}`, doc)
      else console.warn(`  ⚠ blog-posts/${slug}-${locale} — not found`)
    }
  }

  console.log('\n📋 Vacancies...')
  for (const locale of LOCALES) {
    const url = `${PAYLOAD_URL}/api/vacancy-pages?locale=${locale}&depth=1&limit=100&sort=-publishedAt` +
      `&select[slug]=true&select[title]=true&select[department]=true` +
      `&select[locations]=true&select[applyLink]=true`
    const data = await fetchJson(url)
    await saveMock(`vacancies/all-${locale}`, data)
  }

  const vacancySlugs = await fetchAllSlugs('vacancy-pages')
  console.log(`  Found ${vacancySlugs.length} vacancy(s)`)
  for (const locale of LOCALES) {
    for (const slug of vacancySlugs) {
      const doc = await fetchDoc('vacancy-pages', slug, locale, 1)
      if (doc) await saveMock(`vacancies/${slug}-${locale}`, doc)
      else console.warn(`  ⚠ vacancies/${slug}-${locale} — not found`)
    }
  }

  console.log(`\n🖼  Media (${allMediaUrls.size} unique files)...`)
  for (const mediaUrl of allMediaUrls) {
    const relative = mediaUrl.replace(/^\//, '')
    const dest = resolve(PUBLIC_PAYLOAD_DIR, relative)
    await ensureDir(dirname(dest))

    try {
      await access(dest)
      console.log(`  skip (exists) ${relative}`)
    } catch {
      const res = await fetch(`${PAYLOAD_URL}${mediaUrl}`)
      if (res.ok) {
        const buffer = await res.arrayBuffer()
        await writeFile(dest, Buffer.from(buffer))
        console.log(`  ✓ ${relative}`)
      } else {
        console.warn(`  ✗ HTTP ${res.status}: ${mediaUrl}`)
      }
    }
  }

  console.log('\n✅ Snapshot complete!')
  console.log(`   JSON files: mocks/`)
  console.log(`   Media files: public/payload/api/media/`)
}

main().catch(err => {
  console.error('\n❌ Snapshot failed:', err.message)
  process.exit(1)
})
