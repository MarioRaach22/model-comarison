# Particle Gravity Sandbox

## Project Overview
- **Type**: Interactive canvas simulation
- **Core Functionality**: Hundreds of particles affected by gravity, leaving luminous trails, with click-to-add heavy attractors
- **Target Users**: Anyone seeking visual relaxation and physics playground fun

## Visual & Rendering Specification

### Canvas Setup
- Full viewport canvas, responsive to window resize
- Background: Deep space black (#0a0a0f) with subtle radial gradient toward center
- Anti-aliased rendering for smooth particle edges

### Color Palette
- **Particles**: Warm spectrum - amber (#ff6b35), coral (#f7931e), gold (#ffd700)
- **Attractors**: Cool contrast - electric cyan (#00fff7) with white core
- **Trails**: Gradient fade from particle color to transparent
- **UI Text**: Soft white (#e0e0e0) with subtle glow

### Visual Effects
- **Trails**: Motion blur effect using semi-transparent background clear (0.15 alpha)
- **Particle glow**: Radial gradient with soft outer glow per particle
- **Attractor pulse**: Gentle scale oscillation (sin wave) with rotating corona
- **Vignette**: Subtle dark edges framing the scene

## Simulation Specification

### Particle System
- **Count**: 300-500 particles
- **Initial distribution**: Random across canvas with random velocities
- **Particle size**: 1.5-3px radius with glow extending to 6px
- **Mass**: Uniform for all particles (light mass)

### Physics Parameters
- **Gravity constant**: 0.5 (tuned for visual appeal)
- **Velocity damping**: 0.999 (very subtle, preserves momentum)
- **Max velocity cap**: 8px/frame (prevents escape)
- **Trail length**: ~30 frames (varies by particle)

### Attractor Mechanics
- **Mass**: 2000 units (heavy)
- **Gravity formula**: F = G * m1 * m2 / r² (clamped at min distance 20px)
- **Effect radius**: Infinite (canvas bounds)
- **Click behavior**: Add attractor at cursor position
- **Attractor limit**: 10 max (oldest removed when exceeded)

### Performance
- **Target FPS**: 60
- **Spatial consideration**: Simple distance-based forces (acceptable for particle count)

## Interaction Specification

### User Controls
- **Left click**: Add heavy attractor at click position
- **Right click**: Remove nearest attractor
- **Spacebar**: Clear all attractors

### UI Elements
- Minimal overlay showing:
  - Particle count
  - Attractor count
  - Control hints (subtle, bottom-left)

## Acceptance Criteria
1. Canvas fills viewport and handles resize
2. Particles spawn with random positions and small random velocities
3. Particles move smoothly with visible trails
4. Clicking adds a glowing, pulsing attractor
5. Particles curve toward attractors realistically
6. Multiple attractors create complex orbital patterns
7. Trails fade gradually creating motion blur effect
8. Performance stays smooth (50+ FPS) with 400 particles
9. Attractors pulse with visual emphasis
10. Spacebar clears attractors, reset behavior intuitive