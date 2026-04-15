import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export async function readMockFile(filePath) {
  const abs = resolve(process.cwd(), `mocks/${filePath}.json`)
  const raw = await readFile(abs, 'utf-8')
  return JSON.parse(raw)
}
