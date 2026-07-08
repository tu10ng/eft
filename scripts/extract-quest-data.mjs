// ============================================
// Extract quest nodes and edges from the ORIGINAL index.html
// Usage: node scripts/extract-quest-data.mjs [path/to/original.html]
// The current index.html is a minimal Vite entry — use git to get the original:
//   git show HEAD:index.html | node scripts/extract-quest-data.mjs /dev/stdin
// ============================================
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const HTML_PATH = process.argv[2] || join(ROOT, 'public', 'quest-tree.html')
const DATA_DIR = join(ROOT, 'src', 'data')

const TRADER_CLASSES = [
  '_prapor', '_therapist', '_mechanic', '_skier', '_peacekeeper',
  '_ragman', '_fence', '_jaeger', '_lightkeeper', '_ref', '_btr',
]

/** Parse trader from card class list */
function parseTrader(cardDiv) {
  const classAttr = cardDiv.match(/class="([^"]*)"/)?.[1] ?? ''
  const classes = classAttr.split(/\s+/)
  return TRADER_CLASSES.find((c) => classes.includes(c)) ?? ''
}

/** Parse text content of a child element */
function parseChild(html, tag, className) {
  const regex = new RegExp(
    `<${tag}[^>]*class="${className}"[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    'i'
  )
  return html.match(regex)?.[1]?.trim() ?? ''
}

/** Parse all kappa icon divs */
function parseKappas(html) {
  const results = []
  const regex = /<div class="quests-map-card__kappa"\s+title="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*\/>/gi
  let m
  while ((m = regex.exec(html))) {
    results.push({ title: m[1], src: m[2] })
  }
  return results
}

/** Parse level requirement */
function parseLevelReq(html) {
  return html.match(/<div class="quests-map-card__level-req">([\s\S]*?)<\/div>/)?.[1]?.trim() ?? ''
}

/** Parse link URL */
function parseLinkUrl(html) {
  return html.match(/<a[^>]*href="([^"]*)"[^>]*class="quests-map-card__link"/)?.[1] ?? ''
}

/** Extract nodes from HTML */
function extractNodes(html) {
  const nodes = []
  const traderHeaders = []

  // Match each <g class="rd3t-node"> ... </g>
  const gRegex = /<g id="(\d+)" class="rd3t-node"[^>]*>([\s\S]*?)<\/g>/g
  let m
  while ((m = gRegex.exec(html))) {
    const gId = m[1]
    const gContent = m[2]

    // Check if it's a trader header
    if (gContent.includes('quests-map-trader-card')) {
      const imgMatch = gContent.match(/<img[^>]*src="([^"]*)"[^>]*\/>/)
      const foMatch = gContent.match(/<foreignobject[^>]*x="(-?\d+)"\s+y="(-?\d+)"/)
      traderHeaders.push({
        id: gId,
        x: foMatch ? parseInt(foMatch[1]) : 0,
        y: foMatch ? parseInt(foMatch[2]) : 0,
        traderImg: imgMatch?.[1] ?? '',
      })
      continue
    }

    // Parse foreignObject attributes
    const foMatch = gContent.match(/<foreignobject[^>]*width="(\d+)"\s+height="(\d+)"\s+x="(-?\d+)"\s+y="(-?\d+)"/)
    if (!foMatch) continue

    const width = parseInt(foMatch[1])
    const height = parseInt(foMatch[2])
    const x = parseInt(foMatch[3])
    const y = parseInt(foMatch[4])

    // Check highlight
    const isHighlight = gContent.includes('is-highlight')

    // Card inner div
    const cardMatch = gContent.match(/<div class="quests-map-card ([^"]*)">([\s\S]*?)<button/)
    if (!cardMatch) continue

    const cardClasses = cardMatch[1]
    const cardInner = cardMatch[2]
    const trader = TRADER_CLASSES.find((c) => cardClasses.includes(c)) ?? ''

    // Parse title
    const title = parseChild(cardInner, 'div', 'quests-map-card__title')

    // Parse description
    const desc = parseChild(cardInner, 'div', 'quests-map-card__text')

    // Parse link
    const linkUrl = parseLinkUrl(cardInner)

    // Parse level req
    const levelReq = parseLevelReq(cardInner)

    // Parse kappa icons
    const kappas = parseKappas(cardInner)

    // Separate kappa (3x4/DSPT) from trader icon
    let kappaImg = ''
    let kappaTitle = ''
    let traderIcon = ''
    let traderTitle = ''

    for (const k of kappas) {
      if (k.src.includes('/rw/')) {
        traderIcon = k.src
        traderTitle = k.title
      } else {
        kappaImg = k.src
        kappaTitle = k.title
      }
    }

    nodes.push({
      id: gId,
      x, y, width, height,
      trader,
      title,
      description: desc,
      levelReq,
      linkUrl,
      kappaImg,
      kappaTitle,
      traderIcon,
      traderTitle,
      isHighlight,
    })
  }

  return { nodes, traderHeaders }
}

/** Extract edges from HTML with nearest-node matching */
function extractEdges(html, allNodes) {
  const edges = []
  const lineRegex = /<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)" class="(line1|line2|line)"[^>]*>(?:\/\*\s*([^*]*)\s*\*\/)?/g
  let m
  while ((m = lineRegex.exec(html))) {
    const x1 = parseInt(m[1]), y1 = parseInt(m[2])
    const x2 = parseInt(m[3]), y2 = parseInt(m[4])
    const type = m[5]
    const comment = m[6]?.trim() ?? ''

    const sourceNode = findNearestNode(x1, y1, allNodes)
    const targetNode = findNearestNode(x2, y2, allNodes)

    if (sourceNode && targetNode && sourceNode !== targetNode) {
      edges.push({
        id: `e-${edges.length}`,
        source: sourceNode,
        target: targetNode,
        type,
        comment,
      })
    }
  }
  return edges
}

/** Find nearest node to a point using bounding-box distance.
 *  Line endpoints may be offset from card centers by up to ~150px
 *  (e.g., lines leave from card edges, not the center).
 *  We use a generous 350px threshold to catch all valid connections. */
function findNearestNode(px, py, nodes) {
  let best = null
  let bestDist = Infinity
  for (const n of nodes) {
    // Point-to-rect distance: 0 if point is inside the rect
    const dx = Math.max(n.x - px, 0, px - (n.x + n.width))
    const dy = Math.max(n.y - py, 0, py - (n.y + n.height))
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < bestDist) {
      bestDist = dist
      best = n.id
    }
  }
  // 350px = card width, generous enough for any line endpoint near a card
  return bestDist < 350 ? best : null
}

/** Calculate the connection point on the boundary of a node's rect,
 *  used for line endpoints that are slightly outside nodes */
function snapToRectEdge(px, py, node) {
  // If point is inside rect, return point as-is
  if (px >= node.x && px <= node.x + node.width && py >= node.y && py <= node.y + node.height) {
    return { x: px, y: py }
  }
  // Clamp to nearest edge point
  const cx = Math.max(node.x, Math.min(px, node.x + node.width))
  const cy = Math.max(node.y, Math.min(py, node.y + node.height))
  return { x: cx, y: cy }
}

// --- Main ---
console.log('Extracting quest data from index.html...')
const html = readFileSync(HTML_PATH, 'utf-8')
const { nodes, traderHeaders } = extractNodes(html)
const edges = extractEdges(html, nodes)

console.log(`  Nodes: ${nodes.length} quests + ${traderHeaders.length} trader headers`)
console.log(`  Edges: ${edges.length}`)

// Report unmatched lines
const totalLines = (html.match(/<line /g) || []).length
const matchedLines = edges.length
const unmatchedCount = totalLines - matchedLines
console.log(`  Edge match rate: ${matchedLines}/${totalLines} (${((matchedLines/totalLines)*100).toFixed(1)}%)`)
if (unmatchedCount > 0) {
  console.log(`  Unmatched: ${unmatchedCount} — running second pass...`)

  // Re-extract all lines to find what didn't match
  const matchedSet = new Set(edges.map(e => `${e.source}->${e.target}`))
  const allLineEndpoints = []
  const lineRegex2 = /<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)" class="(line1|line2|line)"[^>]*>(?:\/\*\s*([^*]*)\s*\*\/)?/g
  let m2
  while ((m2 = lineRegex2.exec(html))) {
    const x1 = parseInt(m2[1]), y1 = parseInt(m2[2])
    const x2 = parseInt(m2[3]), y2 = parseInt(m2[4])
    const type = m2[5]; const comment = m2[6]?.trim() ?? ''
    // Find nearest with no limit
    let src = null, srcDist = Infinity, tgt = null, tgtDist = Infinity
    for (const n of nodes) {
      const d1 = Math.sqrt(Math.max(n.x-x1,0,x1-(n.x+n.width))**2 + Math.max(n.y-y1,0,y1-(n.y+n.height))**2)
      if (d1 < srcDist) { srcDist = d1; src = n.id }
      const d2 = Math.sqrt(Math.max(n.x-x2,0,x2-(n.x+n.width))**2 + Math.max(n.y-y2,0,y2-(n.y+n.height))**2)
      if (d2 < tgtDist) { tgtDist = d2; tgt = n.id }
    }
    const key = `${src}->${tgt}`
    if (!matchedSet.has(key) && src !== tgt) {
      allLineEndpoints.push({ x1,y1,x2,y2,type,comment,src,srcDist,tgt,tgtDist })
    }
  }

  for (const u of allLineEndpoints.slice(0, 10)) {
    console.log(`    (${u.x1},${u.y1})→(${u.x2},${u.y2}) t=${u.type} src=${u.src}(d=${u.srcDist.toFixed(0)}) tgt=${u.tgt}(d=${u.tgtDist.toFixed(0)}) ${u.comment}`)
  }
  if (allLineEndpoints.length > 10) console.log(`    ... and ${allLineEndpoints.length - 10} more`)
}

// Write output
mkdirSync(DATA_DIR, { recursive: true })
writeFileSync(join(DATA_DIR, 'quest-nodes.json'), JSON.stringify(nodes, null, 2))
writeFileSync(join(DATA_DIR, 'quest-edges.json'), JSON.stringify(edges, null, 2))
writeFileSync(join(DATA_DIR, 'trader-headers.json'), JSON.stringify(traderHeaders, null, 2))
console.log('Done! Wrote to src/data/')
