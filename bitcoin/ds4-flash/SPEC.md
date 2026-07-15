# BTC & XMR Live Price Chart — Specification

## Concept & Vision

A sleek, cyberpunk-inspired live cryptocurrency price tracker that feels like a trading terminal from the future. The interface pulses with energy—glowing neon accents against deep darkness, smooth price animations that feel alive, and data that breathes. Supports Bitcoin (BTC) and Monero (XMR) with a comparison mode. This isn't just a chart; it's a window into the heartbeat of crypto.

## Design Language

### Aesthetic Direction
Dark terminal aesthetic with electric cyan accents. Inspired by Bloomberg terminals meets cyberpunk aesthetics. High contrast, data-dense, but never cluttered.

### Color Palette
- **Background**: `#0a0a0f` (near-black with slight blue undertone)
- **Surface**: `#12121a` (elevated cards)
- **Surface 2**: `#16161f` (stat cards)
- **Border**: `#1e1e2e` (subtle separation)
- **BTC Accent/Cyan**: `#00d4ff` (Bitcoin line, glow)
- **XMR Accent/Orange**: `#ff8c00` (Monero line, glow)
- **Positive**: `#00ff88` (price up, green)
- **Negative**: `#ff4466` (price down, red)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#6b7280`
- **Text Muted**: `#4a5568`

### Typography
- **Headings/Numbers**: `JetBrains Mono` — monospace precision for that terminal feel
- **Body/Labels**: `Inter` — clean readability for UI elements
- **Price Display**: 48px bold monospace with letter-spacing

### Spatial System
- Base unit: 8px
- Card padding: 24px
- Gap between elements: 16px
- Border radius: 12px for cards, 8px for buttons

### Motion Philosophy
- **Chart transitions**: 600ms cubic-bezier(0.4, 0, 0.2, 1) — smooth, slightly elastic
- **Price updates**: 300ms fade + scale pulse on change
- **Button hover**: 150ms background transition
- **Loading states**: Subtle pulse animation
- **Glow effects**: CSS box-shadow with cyan, subtle animation

### Visual Assets
- No external images needed
- Lucide-style inline SVGs for icons (refresh, arrow indicators)
- Subtle grid pattern on chart background
- Glowing border effect on active elements

## Layout & Structure

### Page Structure
```
┌─────────────────────────────────────────────────────┐
│  Header: Coin logo SVG + Dynamic title              │
│  [ View Toggle: BTC | XMR | Compare ]              │
├─────────────────────────────────────────────────────┤
│  Price Display Cards (1 or 2 depending on view)    │
│  ┌──────────────────┐ ┌──────────────────┐         │
│  │ BTC Current      │ │ XMR Current      │  or 1   │
│  │ 24h Change ▲/▼   │ │ 24h Change ▲/▼   │  card   │
│  └──────────────────┘ └──────────────────┘  alone  │
├─────────────────────────────────────────────────────┤
│  Last Updated indicator (shared)                    │
├─────────────────────────────────────────────────────┤
│  7-Day Performance Stats Row (compare mode only)    │
│  ┌──────────────┐ ┌──────────────┐                 │
│  │ BTC 7d: +X%  │ │ XMR 7d: +Y%  │                 │
│  └──────────────┘ └──────────────┘                 │
├─────────────────────────────────────────────────────┤
│  Time Range Selector                                │
│  [ 1H ] [ 24H ] [ 7D ] [ 30D ]                     │
├─────────────────────────────────────────────────────┤
│  Chart Container + Compare Legend                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  Compare: % change normalized                 │  │
│  │  Single: absolute price                       │  │
│  │  - Animated on data/view change               │  │
│  │  - Hover tooltips with price/pct              │  │
│  │  - Gradient fill, grid lines                  │  │
│  └───────────────────────────────────────────────┘  │
│  ── BTC ──── XMR ──  (legend, compare only)        │
├─────────────────────────────────────────────────────┤
│  Footer: Data source attribution                    │
└─────────────────────────────────────────────────────┘
```

### Responsive Strategy
- Max-width: 900px centered
- Mobile: Stack vertically, full-width chart
- Minimum width: 320px supported

## Features & Interactions

### Core Features

**1. Live Price Display**
- BTC and/or XMR current price fetched from Binance API
- Auto-refresh every 10 seconds
- Visual pulse animation when price updates
- Green glow if price increased since last check
- Red glow if price decreased since last check
- Side-by-side dual cards in Compare mode

**2. 24-Hour Change Indicator**
- Percentage change with +/- prefix per coin
- Up arrow (▲) in green for positive change
- Down arrow (▼) in red for negative change
- Absolute change amount shown in USD

**3. Three-View Toggle (BTC | XMR | Compare)**
- Animated pill-style selector with sliding indicator
- BTC mode: single BTC price card + BTC chart
- XMR mode: single XMR price card + XMR chart
- Compare mode: dual price cards + normalized % change chart
- Animates smoothly with 400ms CSS transition on the slider

**4. Comparison Mode — Normalized % Chart**
- Both BTC and XMR prices normalized to percentage change from first data point
- Dual lines on same scale (single y-axis in %)
- BTC line in cyan (#00d4ff), XMR line in orange (#ff8c00)
- Legend beneath chart
- Tooltip shows both % values on hover

**5. Time Range Selector**
- Four buttons: 1H, 24H, 7D, 30D
- Active state: filled background with glow
- Click triggers chart data reload
- Chart animates smoothly during transition
- Loading skeleton while fetching new data

**6. Interactive Chart**
- Line chart using Chart.js for smooth rendering
- Gradient fill under the line
- Glowing line effect
- Animated transitions when data changes
- Responsive resize

**7. Hover Tooltips**
- Show on hover over any chart point
- Display: exact price (single mode) or % change (compare mode)
- Follow cursor smoothly
- Styled to match dark theme

**8. 7-Day Performance Stats Row (Compare Mode)**
- Shows BTC 7d % change and XMR 7d % change side by side
- Each with green/red color coding
- Animated visibility toggle when entering/exiting Compare mode

**9. Last Updated Indicator**
- Shows "Updated X seconds ago"
- Refresh icon that spins during update
- Subtle animation

### Edge Cases & Error Handling
- **API failure**: Show "Unable to fetch data" with retry button
- **Loading state**: Skeleton pulse animation on chart area
- **Stale data**: After 30 seconds without refresh, show warning
- **Rate limiting**: Implement exponential backoff if rate limited

## Component Inventory

### Header Component
- Bitcoin logo (inline SVG, ~24px)
- "BTC/USD Live" title
- Subtle bottom border

### Price Card Component
States:
- **Loading**: Skeleton pulse on price text
- **Default**: Shows price, change, last updated
- **Updated**: Brief scale pulse + glow

### Time Range Button
States:
- **Default**: Transparent bg, muted text
- **Hover**: Slightly brighter background
- **Active/Selected**: Cyan background, white text, glow
- **Disabled**: Reduced opacity (during loading)

### Chart Container
States:
- **Loading**: Animated skeleton with pulse
- **Default**: Chart rendered with current data
- **Transitioning**: Crossfade animation between data sets
- **Error**: Error message with retry option

### Tooltip Component
- Dark semi-transparent background
- Price in white bold
- Timestamp in muted text
- Small triangle pointer
- Fades in on hover (200ms)

### Refresh Indicator
- Circular refresh icon
- Spins during API call
- Pauses when idle

## Technical Approach

### Stack
- Single HTML file with embedded CSS and JavaScript
- Chart.js v4 (CDN) for chart rendering
- CoinGecko free API (no key required)
- Vanilla JavaScript (no framework needed)

### API Integration

**Binance API Endpoints Used:**
- Current price & 24h stats: `GET /api/v3/ticker/24hr?symbol={BTCUSDT|XMRUSDT}`
- Historical klines: `GET /api/v3/klines?symbol={BTCUSDT|XMRUSDT}&interval={1m|5m|1h}&startTime&endTime&limit`
- Both coins fetched in parallel via `Promise.all`
- Binance provides unlimited access without API keys and generous rate limits

**Data Refresh Strategy:**
- Price: Every 10 seconds
- Historical: On time range change only (cached per range)
- Timestamp tracking for "X seconds ago" display

### Chart.js Configuration
- Type: 'line'
- Tension: 0.4 (smooth curves)
- Animated: true with custom duration (600ms)
- Tooltips: Custom styled to match theme
- Scales: Minimal, styled to theme
- Plugins: Custom gradient fill

### State Management
```javascript
state = {
  currentPrice: null,
  previousPrice: null,
  priceChange24h: 0,
  selectedRange: '24H',
  chartData: { prices: [] },
  lastUpdated: Date,
  isLoading: false,
  error: null
}
```

### Performance Considerations
- Debounce rapid range switches
- Cancel in-flight requests on new request
- Use requestAnimationFrame for smooth animations
- Limit DOM updates to necessary elements only