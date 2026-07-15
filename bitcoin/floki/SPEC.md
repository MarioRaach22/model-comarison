# Bitcoin & Monero Live Price Chart — SPEC.md

## 1. Concept & Vision

A premium crypto portfolio tracker that feels like a Bloomberg terminal meets modern fintech — dark, sophisticated, and alive with real-time data. Compare Bitcoin's stability with Monero's privacy-focused alternative on a single, unified dashboard. The experience bridges two crypto philosophies with elegant data visualization. Data precision meets visual elegance.

## 2. Design Language

### Aesthetic Direction
Dark terminal aesthetic with dual neon accents — emerald green for Bitcoin's market dominance, electric purple for Monero's privacy-first approach. Think cyberpunk finance — professional but with enough energy to feel alive. Matrix-inspired subtle grid background.

### Color Palette
- **Background**: `#0a0e17` (deep space black)
- **Surface**: `#131a2a` (card surfaces)
- **Border**: `#1e2a42` (subtle dividers)
- **Primary text**: `#e8edf5` (crisp white)
- **Secondary text**: `#6b7a99` (muted labels)
- **BTC Green**: `#00ff88` (Bitcoin line, profit)
- **BTC Green Dim**: `#00cc6a`
- **XMR Purple**: `#a855f7` (Monero line, privacy)
- **XMR Purple Dim**: `#9333ea`
- **Accent red**: `#ff3366` (loss indicator)
- **Neutral**: `#6b7a99` (unchanged)

### Typography
- **Font**: `Space Mono` for numbers/monospace feel, `Inter` for UI text
- **Price display**: 40px (single view) / 28px (dual view), bold, with subtle glow
- **Labels**: 12-14px, uppercase tracking
- **Tooltips**: 13px, clean and readable

### Spatial System
- Container max-width: 950px, centered
- Card padding: 32px
- Border radius: 16px for cards, 8px for buttons
- Consistent 20px spacing between elements

### Motion Philosophy
- **View toggle transitions**: Slide/fade animation (400ms ease-out) between views
- **Chart transitions**: Morphing animation (500ms ease-out) when switching time ranges
- **Price pulse**: Subtle scale pulse on price update
- **Button states**: Smooth background color transitions (200ms)
- **Hover tooltips**: Fade in 150ms with slight upward movement
- **Ambient**: Subtle pulsing glow on current prices

### Visual Assets
- Custom SVG icons for BTC and XMR in header
- CSS-generated grid pattern background
- Gradient overlays for depth
- No external images needed — pure CSS/SVG

## 3. Layout & Structure

### Page Architecture
```
┌────────────────────────────────────────────────────┐
│  Header: Logo + "BTC / XMR"                        │
├────────────────────────────────────────────────────┤
│  View Toggle: [BTC] [XMR] [Compare]               │
├────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │  BTC/USD Price   │  │  XMR/USD Price   │        │
│  │  $XX,XXX.XX      │  │  $XXX.XX         │        │
│  │  ▲ +X.XX% 24h    │  │  ▲ +X.XX% 24h    │        │
│  └──────────────────┘  └──────────────────┘        │
├────────────────────────────────────────────────────┤
│  7D Performance Comparison Row                     │
│  [BTC: +X.XX%] [XMR: +X.XX%] [Gap: X.XX%]         │
├────────────────────────────────────────────────────┤
│  Time Range: [1H] [24H] [7D] [30D]                │
├────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐        │
│  │                                         │        │
│  │     Line Chart (responsive)             │        │
│  │     Legend in Compare mode               │        │
│  │     with hover tooltip                  │        │
│  │                                         │        │
│  └────────────────────────────────────────┘        │
├────────────────────────────────────────────────────┤
│  Footer: "Auto-updates every 10s"                 │
└────────────────────────────────────────────────────┘
```

### View Modes
1. **BTC Only**: Single green line chart, large price display
2. **XMR Only**: Single purple line chart, large price display  
3. **Compare Mode**: Both lines with legend, normalized percentage scale, side-by-side prices

### Responsive Strategy
- Mobile-first, single column
- Price cards stack vertically on narrow screens
- Chart maintains 16:9 aspect ratio
- Price text scales down on mobile
- Time range buttons wrap if needed

## 4. Features & Interactions

### Core Features
1. **View Toggle**
   - Three options: BTC, XMR, Compare
   - Pill-style segmented control
   - Animated slide transition between views
   - Preserves selected time range across views

2. **Dual Live Price Display**
   - Both BTC and XMR prices always fetched
   - Side-by-side cards in Compare mode
   - Full-width card in single coin view
   - 24h change percentage with + or - indicator
   - Pulsing glow animation on each refresh
   - Coin-specific color coding

3. **7D Performance Comparison**
   - Visible only in Compare mode
   - Shows percentage change for each coin over 7 days
   - Displays the gap/difference between performance
   - Color-coded winners (green if positive, red if negative)

4. **Time Range Selection**
   - Four options: 1H, 24H, 7D, 30D
   - Active state clearly highlighted
   - Chart morphs smoothly when switching
   - Applied to both coins simultaneously

5. **Interactive Chart**
   - BTC Mode: Green line with green gradient fill
   - XMR Mode: Purple line with purple gradient fill
   - Compare Mode: 
     - Both lines on chart with distinct colors
     - Normalized to percentage change from start
     - Legend showing coin labels
     - Dual Y-axis as fallback (or shared % scale)
   - Smooth curved lines (tension: 0.3)
   - Y-axis auto-scales or shows % change

6. **Hover Tooltips**
   - Single mode: Shows exact price and timestamp
   - Compare mode: Shows both prices with coin labels
   - Color-coded to match line colors
   - Follows cursor horizontally

7. **Auto-Refresh**
   - Updates all prices every 10 seconds
   - Visual indicator showing refresh countdown
   - Smooth number transition animation

### API Integration
- **Primary**: Binance public API (no key required)
  - BTC Current price: `https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`
  - XMR Current price: `https://api.binance.com/api/v3/ticker/24hr?symbol=XMRUSDT`
  - Historical klines for each coin
  - Intervals: 1m, 15m, 1h, 4h, 1d

### Edge Cases
- **API failure**: Show "Unable to fetch data" with retry button
- **Loading state**: Skeleton pulse animation on chart area
- **Price unchanged**: Neutral gray indicator
- **Network offline**: Display cached last price with "offline" badge
- **Incomplete data**: Graceful degradation, show available data

## 5. Component Inventory

### ViewToggle
- **Default**: Segmented pill with three options
- **Hover**: Subtle highlight on inactive segments
- **Active**: Filled background with active color
- **Transitioning**: Smooth width/position animation

### PriceCard (Single)
- **Default**: Large price number, 24h change below
- **Updating**: Subtle pulse animation
- **Error**: Shows last known price with warning
- **BTC Style**: Green accent glow
- **XMR Style**: Purple accent glow

### PriceCard (Dual - Compare Mode)
- **Layout**: Two cards side by side
- **Each**: Medium-sized price, 24h change
- **Color**: Coin-specific (BTC green, XMR purple)

### PerformanceComparison
- **Visible**: Compare mode only
- **Structure**: Horizontal row with three stats
- **BTC stat**: +X.XX% with BTC color
- **XMR stat**: +X.XX% with XMR color  
- **Gap stat**: "BTC +X.XX%" or "XMR +X.XX%" (winner highlighted)

### TimeRangeButton
- **Default**: Transparent background, muted text
- **Hover**: Slight background highlight
- **Active**: Glowing border, bright text
- **Disabled**: Reduced opacity (during loading)

### Chart
- **Loading**: Skeleton with shimmer animation
- **Single mode**: One line with gradient fill
- **Compare mode**: Two lines, legend, normalized scale
- **Hover**: Crosshair + tooltip visible (multi-line in compare)
- **Transitioning**: Morphing animation between states
- **Error**: Error message with retry option

### Tooltip (Compare Mode)
- **Structure**: Coin label + price for each coin
- **Style**: Dark surface, coin-specific colors
- **Animation**: Fade + slide up on appear

### RefreshIndicator
- **Idle**: "Updates in Xs" countdown
- **Refreshing**: Spinning icon briefly
- **Error**: Red warning state

## 6. Technical Approach

### Stack
- Single HTML file with embedded CSS and JavaScript
- Chart.js for the line chart (CDN)
- No build tools required

### Architecture
```javascript
// Multi-coin state management
const state = {
  currentView: 'compare', // 'btc' | 'xmr' | 'compare'
  selectedRange: '24H',
  
  btc: {
    currentPrice: null,
    priceChange24h: 0,
    changePercent24h: 0,
    historicalData: [],
  },
  xmr: {
    currentPrice: null,
    priceChange24h: 0,
    changePercent24h: 0,
    historicalData: [],
  },
  
  lastUpdate: null,
  isLoading: false,
  refreshCountdown: 10,
  chart: null
};

// Core functions
- fetchCoinPrice(coin) → updates state[coin]
- fetchHistorical(coin, range) → updates state[coin].historicalData
- updateChart() → re-renders based on currentView
- normalizeToPercentChange(data) → percentage from start
- updateView(newView) → animated transition
- startAutoRefresh() → 10s interval
```

### API Endpoints
- Symbol mapping:
  - BTC: `BTCUSDT`
  - XMR: `XMRUSDT`
- Klines intervals map (same for both):
  - `1H` → `1m` (60 points)
  - `24H` → `15m` (96 points)
  - `7D` → `1h` (168 points)
  - `30D` → `4h` (180 points)

### Percentage Normalization (Compare Mode)
```
normalizedPrice[i] = ((price[i] - price[0]) / price[0]) * 100
```
- Starting point always 0%
- Positive = gains, Negative = losses
- Allows comparison of different-priced assets

### Animation Implementation
- View toggle: CSS transforms with JS class switching
- Chart.js `update()` with `animation.duration: 500`
- CSS transitions for UI elements
- Chart.js datasets added/removed with animation