# World Language Explorer - Specification

## Concept & Vision

An elegant, educational interactive map that reveals the linguistic diversity of our world. Users explore countries by hovering to see names, clicking to reveal detailed language profiles, and toggling a mode that transforms the entire map into a chromatic tapestry of language families. The experience feels like a beautifully designed atlas from a prestigious cartographic institute—scholarly yet approachable, information-rich yet never overwhelming.

## Design Language

**Aesthetic Direction:** Modern cartographic elegance inspired by National Geographic and classic atlas maps. Clean lines, sophisticated color palette, subtle textures.

**Color Palette:**
- Background: `#f4f4f0` (warm paper white)
- Land default: `#e8e4dc` (parchment cream)
- Land hover: `#d4e4bc` (soft sage highlight)
- Country selected: `#4a7c59` (forest green)
- Borders: `#c9c5ba` (warm gray)
- Ocean: `#b8d4e8` (soft blue)
- Text primary: `#2c3e50` (deep navy)
- Text secondary: `#6b7c8c` (muted slate)
- Panel background: `#ffffff`
- Panel border: `#dde1e6`
- Search box: `#f8f9fa`
- No data color: `#9ca3af`

**Language Family Colors (for toggle mode):**
- Indo-European: `#4a7c59` (forest green)
- Sino-Tibetan: `#e74c3c` (vermillion red)
- Afroasiatic: `#f39c12` (amber gold)
- Austronesian: `#3498db` (ocean blue)
- Dravidian: `#9b59b6` (royal purple)
- Niger-Congo: `#e67e22` (burnt orange)
- Japonic: `#1abc9c` (teal)
- Koreanic: `#2ecc71` (emerald)
- Turkic: `#9b59b6` (violet)
- Uralic: `#34495e` (slate)
- Altaic/Other: `#95a5a6` (stone gray)
- Unknown/No Data: `#d5d8dc` (light gray)

**Typography:**
- Headings: 'Merriweather', Georgia, serif
- Body: 'Source Sans 3', -apple-system, sans-serif
- Map labels/UI: 'Source Sans 3'

**Spatial System:**
- Map takes full viewport with subtle padding
- Info panel: fixed right sidebar (320px width) on desktop, slides up from bottom on mobile
- Tooltip: positioned near cursor, max-width 200px
- Legend: fixed bottom-left corner

**Motion Philosophy:**
- Map zoom/pan: smooth 300ms ease-out transitions
- Country hover: 150ms color transition
- Panel slide-in: 250ms ease-out from right
- Tooltip fade: 100ms

## Layout & Structure

**Main View:**
```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────┐ ┌─────────────┐ │
│ │                                 │ │ Country     │ │
│ │                                 │ │ Panel       │ │
│ │         Interactive Map         │ │             │ │
│ │         (D3 SVG Canvas)         │ │ [Shows on   │ │
│ │                                 │ │  click]     │ │
│ │                                 │ │             │ │
│ └─────────────────────────────────┘ └─────────────┘ │
│ ┌───────────┐                              ┌──────┐ │
│ │  Search   │                              │Legend│ │
│ └───────────┘                              └──────┘ │
└─────────────────────────────────────────────────────┘
```

**Responsive Strategy:**
- Desktop (>1024px): Side panel
- Tablet/Mobile (<1024px): Bottom sheet panel, floating search

## Features & Interactions

**1. Map Rendering**
- Natural Earth projection centered at 0°, 0°
- TopoJSON world data from jsdelivr CDN (world-atlas)
- Country borders with subtle stroke
- Smooth zoom (mouse wheel/pinch) and pan (drag)
- Reset view button

**2. Hover Interaction**
- Country fills with hover color (#d4e4bc)
- Tooltip appears near cursor showing country name
- Tooltip fades in 100ms, fades out when leaving country
- Smooth transition between countries

**3. Click Interaction**
- Selected country fills with selected color (#4a7c59)
- Previous selection cleared
- Info panel slides in from right with:
  - Country name (large heading)
  - Official languages list (with "Official" badge)
  - Widely spoken languages list (with "Widely Spoken" badge)
  - Language family tags
  - Panel closes via X button or clicking elsewhere

**4. Search Functionality**
- Search input at top-left
- Fuzzy matching on country names
- Dropdown suggestions appear as user types (max 5)
- Clicking suggestion zooms and pans to country, selects it
- Empty search resets to full view
- Search input shows loading state while fetching data initially

**5. Language Family Color Mode Toggle**
- Toggle switch in top-right: "Color by Language Family"
- When ON: each country colored by its dominant (most widely spoken official) language family
- Legend appears bottom-left showing all language families with their colors
- Legend items clickable to highlight all countries of that family
- When OFF: map returns to default neutral coloring

**6. No Data Handling**
- Countries without language data show with striped pattern
- Info panel displays "No language data available for this country"
- These countries still respond to hover/click normally (shows tooltip/panel with no data message)

## Component Inventory

**Map Canvas**
- States: loading (spinner), ready, error (retry button)
- SVG element with zoom behavior attached
- Countries as path elements with data attributes

**Country Path**
- States: default, hover, selected, highlighted-by-legend, no-data
- Default: fill `#e8e4dc`, stroke `#c9c5ba`
- Hover: fill `#d4e4bc`, cursor pointer
- Selected: fill `#4a7c59`, stroke darker
- No-data: striped fill pattern

**Tooltip**
- States: hidden, visible
- Small floating box with pointer
- Country name in bold
- Positioned to avoid viewport edges

**Info Panel**
- States: hidden, visible
- Slide-in animation from right
- Header with country name + close button
- Sections for official languages, spoken languages, language families
- Badge styling for language type indicators

**Search Box**
- States: empty, typing, loading, has-results
- Input field with search icon
- Dropdown list with suggestions
- Each suggestion shows country name

**Language Family Legend**
- States: hidden, visible
- List of language family items
- Each item: color swatch + name
- Clickable to filter
- Shows count of countries per family

**Toggle Switch**
- States: off, on, hover
- Styled toggle with label
- Smooth transition between states

## Technical Approach

**Libraries:**
- D3.js v7 from cdnjs (https://cdnjs.cloudflare.com/ajax/libs/d3/)
- topojson-client from jsdelivr (for parsing TopoJSON)
- world-atlas TopoJSON from jsdelivr (https://cdn.jsdelivr.net/npm/world-atlas@2/)

**Architecture:**
- Single HTML file with embedded CSS and JavaScript
- ES6+ JavaScript, no build step required
- All language data embedded as JavaScript object
- Country matching via ISO 3166-1 numeric codes from TopoJSON

**Language Data Structure:**
```javascript
{
  "840": { // ISO numeric code
    name: "United States",
    official: ["English"],
    widelySpoken: ["Spanish"],
    languageFamily: "Indo-European",
    languageFamilyDetail: "Germanic"
  },
  // ...
}
```

**Key Implementation Details:**
- Use d3.geoNaturalEarth1() for projection
- Use d3.zoom() for pan/zoom behavior
- TopoJSON converted to GeoJSON via topojson.feature()
- Countries colored by numeric ISO code mapping
- Debounced search input (150ms)
- RequestAnimationFrame for smooth tooltip positioning

**Error Handling:**
- Try-catch around data fetching with fallback message
- Countries with no data mapped gracefully
- Console warnings for missing data (not blocking)
- Network timeout handling for CDN requests