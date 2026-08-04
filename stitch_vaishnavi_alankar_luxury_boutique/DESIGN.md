---
name: Luminous Prestige
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c6c7c2'
  on-secondary: '#2f312e'
  secondary-container: '#484a46'
  on-secondary-container: '#b8b9b4'
  tertiary: '#9bdea8'
  on-tertiary: '#003919'
  tertiary-container: '#80c28e'
  on-tertiary-container: '#085028'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#aef2bb'
  tertiary-fixed-dim: '#93d6a0'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#0b5229'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 84px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

The design system is centered on an atmosphere of "Dark Luxury" and "Cinematic Elegance." It targets a high-discerning clientele who value heritage, craftsmanship, and exclusivity. The visual narrative treats every product as a masterpiece under a spotlight.

The design style is a sophisticated blend of **Minimalism** and **Glassmorphism**, set against a deep, light-absorbing background to allow the primary gold accents to "glow." The emotional response should be one of awe, quiet confidence, and timelessness. Interfaces should feel less like a storefront and more like a curated private gallery.

## Colors

The palette is anchored by the interplay between the void (**Deep Black**) and the divine (**Champagne Gold**). 

- **Primary (Champagne Gold):** Used for critical calls to action, brand iconography, and highlights. It should be treated as a source of light.
- **Secondary (Ivory White):** Used for primary body text and high-contrast labels to ensure legibility against dark backgrounds.
- **Tertiary (Emerald Green):** Used sparingly for "Limited Edition" tags, success states, or subtle decorative accents to ground the gold.
- **Surface (Rich Charcoal):** Applied to containers with varying levels of opacity (60–80%) to create the glassmorphism effect.

## Typography

This design system utilizes a high-contrast typographic scale to differentiate between editorial storytelling and functional utility. 

**Playfair Display** serves as the emotional anchor. Use it for hero sections and product titles. For larger headlines, apply a subtle text-shadow of `rgba(212, 175, 55, 0.3)` with a wide blur to simulate a gold glow.

**Montserrat** provides the modern, functional balance. Body copy should favor the "Light" (300) weight to maintain a delicate, premium feel. Navigation and small labels must always use the `label-caps` style with wide letter spacing to evoke luxury branding.

## Layout & Spacing

The layout philosophy is "The Breath of Luxury." It utilizes a **fixed grid** (12 columns) but prioritizes extreme white space (or "black space") to force focus onto the jewelry.

- **Desktop:** 80px side margins with 160px vertical gaps between major sections.
- **Alignment:** Centralized alignment is preferred for hero and storytelling sections; asymmetrical layouts are used for product galleries to create a dynamic, editorial feel.
- **Responsiveness:** On mobile, margins shrink to 24px, and vertical gaps compress to 80px. Grid collapses to a 2-column or 1-column view for product listings to maintain large imagery.

## Elevation & Depth

Depth is not created with traditional drop shadows, but through **light and transparency**.

- **Glassmorphism Layering:** Surfaces use a background blur (minimum 20px) and a semi-transparent fill of the Surface color (#1A1A1A at 70%).
- **Inner Glow:** Elements like buttons or active cards should feature a subtle 1px inner border in Champagne Gold at 20% opacity to simulate light hitting an edge.
- **Shadows:** Where used, shadows are "Ambient Glows"—large, very soft blurs using a dark gold tint (`#D4AF37` at 5-10% opacity) instead of pure black.
- **Z-Index Strategy:** The sticky navbar always sits on the highest tier with a heavy backdrop filter (blur 40px) to maintain legibility over scrolling content.

## Shapes

To maintain a sophisticated and architectural aesthetic, this design system uses **Sharp (0)** roundedness. Every element—from buttons to product cards and input fields—features crisp 90-degree angles. This geometry reflects the precision of gemstone cutting and reinforces a high-fashion, "editorial" look.

## Components

### Buttons
- **Primary:** Solid Champagne Gold text on a transparent background with a 1px Gold border. On hover, the button fills with Gold and shifts text to Deep Black.
- **Secondary:** Ivory White text, 1px Ivory border, no fill.

### Luxury Product Cards
- **Visuals:** Edge-to-edge photography.
- **Interaction:** On hover, the image scales slowly (1.05x) and a subtle Gold "Inner Glow" border appears.
- **Details:** Pricing and titles appear in `label-caps` below the image.

### Navigation
- **Sticky Navbar:** Fully transparent until scroll. Upon scroll, transitions to a Glassmorphic state (#1A1A1A at 60% with 30px blur).
- **Links:** Montserrat 12px, 0.2em spacing. Active state indicated by a 1px Gold underline that expands from the center.

### Input Fields
- **Styling:** Bottom-border only (1px Ivory White).
- **Focus:** Border transitions to Champagne Gold with a subtle outer glow.
- **Labels:** Floating labels using Montserrat 10px.

### Additional Components
- **Micro-interactions:** Page transitions should use a "fade and slide up" effect (duration: 600ms, easing: cubic-bezier(0.22, 1, 0.36, 1)).
- **Image Overlays:** All background images should have a 40% black overlay to ensure text contrast and consistent cinematic mood.