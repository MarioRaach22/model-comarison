# World Cup 2026 Tippspiel - Specification

## Concept & Vision

A vibrant, stadium-atmosphere prediction game where users forecast World Cup 2026 knockout stage results. The experience evokes the electric excitement of tournament brackets — with dynamic animations showing teams advancing through rounds, flags of nations unfurling, and a satisfying scoring system that rewards both bold exact-match predictions and cautious winner-picks. Think stadium lights, championship gold, and the roar of the crowd translated into UI.

## Design Language

### Aesthetic Direction
Championship Night — deep stadium greens and blacks with brilliant gold accents, illuminated panel effects, and a sense of prestige befitting the world's greatest football tournament.

### Color Palette
- **Primary**: `#1a472a` (Stadium Green)
- **Secondary**: `#0d1f17` (Deep Night)
- **Accent Gold**: `#ffd700` (Championship Gold)
- **Accent Cyan**: `#00d4ff` (Electric Highlight)
- **Winner Glow**: `#4ade80` (Victory Green)
- **Background**: `#0a1612` (Dark Turf)
- **Surface**: `#152820` (Pitch Green)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#94a3b8`
- **Error/Wrong**: `#ef4444`

### Typography
- **Headings**: "Oswald" (bold, condensed, championship feel)
- **Body/Scores**: "Barlow Condensed" (clean, readable numbers)
- **Flags**: Country flags via flagcdn.com CDN

### Spatial System
- Bracket flows left-to-right: Round of 16 → Quarterfinals → Semifinals → Final → Champion
- Cards have 16px padding, 12px border-radius
- 24px gaps between rounds, 16px between matches
- Score inputs are large (48px wide) for easy tapping

### Motion Philosophy
- **Team advancement**: Slide + fade from source match to next round slot (400ms ease-out)
- **Winner highlight**: Pulse glow effect (gold → green gradient)
- **Score entry**: Subtle scale bounce on input
- **Button interactions**: Lift + shadow on hover, press effect on click
- **Bracket line draws**: SVG paths animate on winner selection

### Visual Assets
- Team flags from `https://flagcdn.com/w80/{country_code}.png`
- Custom trophy SVG for champion display
- Decorative stadium light rays in header
- Phosphor icons for UI elements

## Layout & Structure

### Page Architecture
1. **Header** — Title with decorative light rays, points counter prominently displayed
2. **Action Bar** — Reset and Simulate buttons
3. **Bracket View** — Main interactive area, horizontally scrollable on mobile
4. **Champion Display** — Animated celebration when final is decided

### Bracket Layout
```
Round of 16     Quarterfinals    Semifinals     Final        Champion
   [Match 1] ──▶                                                              
   [Match 2] ──▶  [Match A] ──▶                                            
   [Match 3] ──▶               │                                            
   [Match 4] ──▶  [Match B] ──▶  [Finalist 1] ──▶   [🏆 FINAL] ──▶  [TROPHY]
   [Match 5] ──▶               │                                            
   [Match 6] ──▶  [Match C] ──▶  [Finalist 2] ──▶   [Match D]              
   [Match 7] ──▶                                                            
   [Match 8] ──▶  [Match D] ──▶                                            
```

### Responsive Strategy
- Desktop: Full bracket visible with comfortable spacing
- Tablet: Horizontal scroll, touch-friendly match cards
- Mobile: Horizontal scroll mandatory, stacked rounds option

## Features & Interactions

### Core Features

#### 1. Match Prediction Entry ✓
- Tap any match card to open prediction modal
- Two large number inputs for each team's score
- Save button confirms prediction
- Existing prediction pre-fills the inputs
- Modal closes on save, cancel, or tap outside

#### 2. Winner Determination & Advancement ✓
- When both scores are predicted, higher score wins
- Tie-breaker: Team1 wins by default
- Winner visually highlighted with gold border and class styling
- After score is set, winner "travels" to next round slot via updateDownstreamMatches

#### 3. Points System ✓
- **Exact result** (correct winner + correct scores): **3 points**
- **Correct winner only** (scores wrong but winner right): **1 point**
- **Incorrect prediction**: **0 points**
- Points display updates with satisfying counter animation (point-bump effect)

#### 4. Reset Function ✓
- Clears all predictions and state
- Returns all matches to empty state
- Champion display cleared
- Toast notification confirms reset

#### 5. Simulate Function ✓
- Fills all matches with random scores (0-3 range, bias toward lower scores)
- Propagates winners through bracket automatically
- Staggered animation as matches simulate
- Points calculated after each match, cumulative display
- Champion announced via toast

### Interaction Details

#### Match Card Hover
- Subtle lift (translateY -3px)
- Shadow intensifies with cyan glow
- Border brightens to cyan

#### Match Card Click
- Opens modal centered on screen with overlay
- Modal slides/scales into view

#### Score Input
- Large touch targets (80x80px in modal)
- Keyboard input supported
- Focus state with gold glow

#### Winner Animation
- Card pulses with winner-advancing animation class
- Winner row gets gold highlight
- Loser row dims

### Edge Cases Handled
- **Match without teams**: Skip during simulation
- **Already simulated match**: Skip during simulation
- **Null matchId after modal close**: Fixed by storing matchId before closeModal()

## Component Inventory

### 1. MatchCard
**States:**
- Empty: Dashed border, "TAP TO PREDICT" text, team slots show "?"
- Predicted: Solid border, both scores shown, winner indicated
- Decided: Winner highlighted with glow, loser faded
- Locked: Downstream match exists, editing disabled

**Visual:**
- Team 1 name + flag (left)
- VS divider with score inputs when editing
- Team 2 name + flag (right)
- Winner indicator icon

### 2. ScoreModal
**States:**
- Open: Overlay visible, modal centered/slide-up
- Saving: Button shows spinner
- Closed: Hidden

**Visual:**
- Dark overlay (rgba(0,0,0,0.8))
- White card with match context
- Large score inputs with team labels
- Save and Cancel buttons

### 3. BracketConnector
**Visual:**
- SVG path from match output to next match input
- Dashed when empty, solid when filled
- Animated draw on winner selection

### 4. PointsDisplay
**States:**
- Default: Shows current points
- Updating: Number animates up with celebration effect

**Visual:**
- Large number in gold
- "PUNKTE" label below
- Trophy icon

### 5. ActionButton
**Variants:**
- Reset (outlined, red accent)
- Simulate (filled, green accent)

**States:**
- Default, Hover, Active, Disabled

### 6. ChampionDisplay
**States:**
- Empty: Outlined trophy silhouette
- Decided: Team flag + name + celebration animation

## Technical Approach

### Stack
- Single HTML file with embedded CSS and JavaScript
- Vanilla JS for full control over animations
- CSS custom properties for theming
- CSS Grid for bracket layout
- Web Animations API for advanced sequences

### Architecture
- State object holds all match predictions and determined winners
- Event delegation for match card clicks
- Manual DOM updates on state change
- Predictions stored separately from simulated actual results for scoring

### Data Model
```javascript
{
  matches: {
    'r16-1': { 
      team1: 'BRA', 
      team2: 'KOR', 
      prediction: { score1: 2, score2: 1 },  // User's prediction
      actual: { score1: 1, score2: 0 },      // Simulated actual result
      winner: 'KOR'
    },
    // ... Round of 16 through Final
  },
  points: 15,
  champion: 'KOR'
}
```

### World Cup 2026 Teams (Realistic)
Using plausible 2026 World Cup qualifiers/participants:
- Round of 16 matchups pre-defined with seedings
- Teams with realistic flags via country codes