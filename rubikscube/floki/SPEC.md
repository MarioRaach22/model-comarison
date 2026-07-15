# Rubik's Cube - Interactive 3D Visualization

## Project Overview
- **Project name**: Floki's Rubik's Cube
- **Type**: Interactive 3D simulation
- **Core functionality**: A fully interactive 3D Rubik's Cube with smooth animated rotations, scramble, and solve features
- **Target users**: Puzzle enthusiasts, casual users wanting visual entertainment

## Visual & Rendering Specification

### Scene Setup
- **Camera**: Perspective camera with orbit controls (mouse drag to rotate view)
- **Lighting**: 
  - Ambient light (soft, 0.4 intensity)
  - Three directional lights for depth (top-left, top-right, bottom)
  - Subtle shadow effect on cube body
- **Environment**: Dark gradient background (#0a0a0f to #1a1a2e) with subtle grid pattern

### Cube Design
- **Structure**: 3x3x3 cube with 26 visible cubies (center hidden)
- **Colors**: Classic Rubik's Cube palette
  - White (top/U): #FFFFFF
  - Yellow (bottom/D): #FFD500
  - Red (front/F): #B71234
  - Orange (back/B): #FF5800
  - Blue (right/R): #0046AD
  - Green (left/L): #009B48
- **Materials**: 
  - Glossy plastic appearance with slight reflectivity
  - Black borders between cubies (0.08 thickness)
  - Rounded corners on cubies (border-radius effect via CSS)
- **Size**: Cubies ~50px with 4px gaps

### Visual Effects
- **Cube shadows**: Soft drop shadow beneath cube
- **Hover effects**: Slight glow on buttons
- **Animation easing**: Cubic-bezier for smooth rotation transitions
- **Perspective**: 1000px for realistic 3D depth

## Animation Specification

### Rotation Animations
- **Duration**: 300ms per face rotation
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Style**: Smooth 90° rotations on all 6 faces (F, B, R, L, U, D)
- **Direction**: Clockwise and counter-clockwise

### Scramble Animation
- **Duration**: 20 random moves
- **Speed**: 150ms per move (faster than user-initiated)
- **Visual**: Sequential face rotations with visible animation

### Solve Animation
- **Duration**: Reverse of scramble sequence
- **Speed**: 150ms per move
- **Logic**: Track move history and reverse

## Interaction Specification

### Controls
- **Mouse drag on cube**: Orbit camera around cube (360° horizontal, limited vertical)
- **Scramble button**: Performs 20 random rotations with animation
- **Solve button**: Reverses all scramble moves to return to solved state
- **Reset button**: Instantly resets cube to solved state

### Button Styling
- **Scramble**: Purple gradient (#9333EA to #7C3AED)
- **Solve**: Blue gradient (#3B82F6 to #2563EB)
- **Reset**: Gray gradient (#6B7280 to #4B5563)
- **Hover**: Scale up 1.05 with brighter glow
- **Disabled state**: Reduced opacity during animation

## Technical Implementation

### Structure
- Single HTML file with embedded CSS and JavaScript
- CSS 3D transforms for cube manipulation
- No external dependencies (pure vanilla JS)

### Cube State Management
- 6 faces × 9 stickers array representation
- Rotation matrices for state updates
- Move history array for solve functionality

### Performance
- Hardware-accelerated CSS transforms
- RequestAnimationFrame for smooth rendering
- Debounced controls during animation

## Acceptance Criteria
1. ✓ Cube renders with all 6 colors visible
2. ✓ Cube can be rotated by dragging mouse
3. ✓ Scramble button animates 20 random moves
4. ✓ Solve button reverses scramble moves smoothly
5. ✓ All rotations complete in 300ms with smooth easing
6. ✓ Buttons are disabled during animations
7. ✓ Cube returns to exact solved state after solve
8. ✓ Visual design is polished with gradients and shadows