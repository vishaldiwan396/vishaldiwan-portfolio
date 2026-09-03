/* The delivered artworks are drawn at hairline weight — strokes of 0.35 to
   0.7 units on an 800-unit canvas — which is invisible at the small sizes
   the page wants them at. This writes a second copy of each file with the
   line weight raised and nothing else changed: same paths, same geometry,
   same colours. The originals in public/art stay untouched.

   Run: node scripts/ink-art.mjs */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'public/art'
const OUT = 'public/art/ink'
// The width each piece is actually drawn at on the page. Weight is solved
// backwards from it so every piece lands on a stroke of about 0.85 CSS px.
const DISPLAY = {
  '01-rosette-masthead.svg': 300,
  '02-interference-basis.svg': 300,
  '03-broken-seal-killed.svg': 300,
  '04-braid-divider.svg': 420,
  '05-tributaries-choosing.svg': 320,
  '06-contours-essay.svg': 320,
}
const TARGET_PX = 0.85

mkdirSync(OUT, { recursive: true })
for (const f of readdirSync(SRC).filter((n) => n.endsWith('.svg'))) {
  const svg = readFileSync(join(SRC, f), 'utf8')
  const w = Number((svg.match(/width="(\d+(?:\.\d+)?)"/) || [])[1])
  const widths = [...svg.matchAll(/stroke-width="([\d.]+)"/g)].map((m) => Number(m[1]))
  if (!w || !widths.length) continue
  widths.sort((a, b) => a - b)
  const median = widths[Math.floor(widths.length / 2)]
  const need = (TARGET_PX * w) / DISPLAY[f]
  const k = need / median
  const out = svg.replace(/stroke-width="([\d.]+)"/g, (_, v) =>
    `stroke-width="${(Number(v) * k).toFixed(3)}"`,
  )
  writeFileSync(join(OUT, f), out)
  console.log(f, 'median', median, '->', (median * k).toFixed(2), `(x${k.toFixed(1)})`)
}
