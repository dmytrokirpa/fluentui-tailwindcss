# @fluentui/tailwindcss

Fluent UI design tokens as Tailwind CSS v4 presets. Use Microsoft's Fluent Design System in your Tailwind CSS projects with runtime theme switching support.

## Features

- **Runtime Theme Switching**: Switch between themes at runtime using `data-theme` attribute
- **Multiple Themes**: Includes Web Light/Dark and Teams Light/Dark themes
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Tailwind v4**: Built specifically for Tailwind CSS v4's `@theme` directive
- **Typography Utilities**: Pre-built typography classes matching Fluent UI styles
- **Zero Config**: Import and use - no complex setup required

## Installation

```bash
npm install @fluentui/tailwindcss @fluentui/tokens
```

> **Note:** `@fluentui/tokens` is a peer dependency. If you're only using the pre-built CSS preset, you don't need to install it. However, if you want to generate custom presets programmatically, you'll need `@fluentui/tokens` installed.

## Quick Start

### Using the Unified Preset

The easiest way to get started is to import the unified preset that includes all themes with runtime switching:

```css
/* app.css */
@import "tailwindcss";
@import "@fluentui/tailwindcss/presets/preset.css";

/* Your custom styles */
```

Then control the theme using the `data-theme` attribute on your HTML element:

```html
<!-- Default theme (web-light) -->
<html>
  <body class="bg-neutral-background1 text-neutral-foreground1">
    <h1 class="typography-title1">Welcome to Fluent UI</h1>
  </body>
</html>

<!-- Dark theme -->
<html data-theme="web-dark">
  <body class="bg-neutral-background1 text-neutral-foreground1">
    <h1 class="typography-title1">Dark Mode</h1>
  </body>
</html>

<!-- Teams theme -->
<html data-theme="teams-light">
  <body class="bg-neutral-background1 text-neutral-foreground1">
    <h1 class="typography-title1">Teams Theme</h1>
  </body>
</html>
```

### Available Themes

The unified preset includes:

- `web-light` (default) - Fluent UI Web Light theme
- `web-dark` - Fluent UI Web Dark theme
- `teams-light` - Microsoft Teams Light theme
- `teams-dark` - Microsoft Teams Dark theme

### Dynamic Theme Switching

You can switch themes dynamically with JavaScript:

```javascript
// Switch to dark theme
document.documentElement.setAttribute('data-theme', 'web-dark');

// Switch to Teams light theme
document.documentElement.setAttribute('data-theme', 'teams-light');

// Reset to default theme
document.documentElement.removeAttribute('data-theme');
```

## Using Design Tokens

The preset exposes Fluent UI design tokens as Tailwind CSS classes and CSS variables:

### 1. Tailwind CSS Classes (from `@theme`)

Tokens defined in `@theme` are available as standard Tailwind utility classes:

**Colors:**

```html
<!-- Use color tokens directly as Tailwind classes -->
<div class="bg-neutral-background1 text-neutral-foreground1">
  Content
</div>

<div class="bg-brand-background text-brand-foreground1">
  Brand content
</div>

<div class="border-neutral-stroke1">
  Border
</div>
```

**Border Radius:**

```html
<div class="rounded-small">Small radius</div>
<div class="rounded-medium">Medium radius</div>
<div class="rounded-large">Large radius</div>
<div class="rounded-x-large">Extra large radius</div>
<div class="rounded-circular">Circular</div>
```

**Text Sizes:**

```html
<p class="text-base300">Base 300 (14px)</p>
<p class="text-base400">Base 400 (16px)</p>
<p class="text-base500">Base 500 (20px)</p>
<p class="text-hero700">Hero 700 (24px)</p>
<p class="text-hero800">Hero 800 (28px)</p>
```

**Line Heights:**

```html
<p class="leading-base300">Base 300 line height</p>
<p class="leading-base400">Base 400 line height</p>
<p class="leading-hero700">Hero 700 line height</p>
```

**Font Weights:**

```html
<p class="font-weight-regular">Regular</p>
<p class="font-weight-medium">Medium</p>
<p class="font-weight-semibold">Semibold</p>
<p class="font-weight-bold">Bold</p>
```

**Shadows:**

```html
<div class="shadow-2">Shadow 2</div>
<div class="shadow-4">Shadow 4</div>
<div class="shadow-8">Shadow 8</div>
<div class="shadow-16">Shadow 16</div>
<div class="shadow-2-brand">Brand shadow 2</div>
```

**Easing Functions:**

```html
<div class="transition ease-accelerate-max">Accelerate max</div>
<div class="transition ease-decelerate-mid">Decelerate mid</div>
<div class="transition ease-easy-ease">Easy ease</div>
```

### 2. Spacing Variables (CSS Variables)

Spacing tokens are available as CSS variables and should be used with Tailwind's arbitrary value syntax:

```html
<!-- Padding -->
<div class="px-[--spacingHorizontalS] py-[--spacingVerticalM]">
  Fluent UI spacing
</div>

<!-- Margin -->
<div class="mx-[--spacingHorizontalL] my-[--spacingVerticalS]">
  Centered with Fluent spacing
</div>

<!-- Gap in flexbox/grid -->
<div class="flex gap-x-[--spacingHorizontalM] gap-y-[--spacingVerticalL]">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Individual sides -->
<div class="ps-[--spacingHorizontalXS] pe-[--spacingHorizontalM]">
  Different left/right padding
</div>
```

**Available spacing variables:**

- `--spacingHorizontalNone`, `--spacingHorizontalXXS`, `--spacingHorizontalXS`, `--spacingHorizontalSNudge`, `--spacingHorizontalS`, `--spacingHorizontalMNudge`, `--spacingHorizontalM`, `--spacingHorizontalL`, `--spacingHorizontalXL`, `--spacingHorizontalXXL`, `--spacingHorizontalXXXL`
- `--spacingVerticalNone`, `--spacingVerticalXXS`, `--spacingVerticalXS`, `--spacingVerticalSNudge`, `--spacingVerticalS`, `--spacingVerticalMNudge`, `--spacingVerticalM`, `--spacingVerticalL`, `--spacingVerticalXL`, `--spacingVerticalXXL`, `--spacingVerticalXXXL`

This leverages Tailwind's full utility set (px, py, pt, pb, pl, pr, ps, pe, mx, my, mt, mb, ml, mr, ms, me, gap, gap-x, gap-y, etc.) with Fluent UI spacing values.

### Typography Utilities

The preset includes pre-built typography utilities matching Fluent UI's type system:

```html
<h1 class="typography-title1">Large Title</h1>
<h2 class="typography-title2">Title</h2>
<h3 class="typography-subtitle1">Subtitle</h3>
<p class="typography-body1">Regular body text</p>
<p class="typography-body1-strong">Semibold body text</p>
<p class="typography-caption1">Caption text</p>
```

**Available typography utilities:**

- `.typography-display` - Display text (68px)
- `.typography-large-title` - Large title (40px)
- `.typography-title1` - Title 1 (28px)
- `.typography-title2` - Title 2 (24px)
- `.typography-title3` - Title 3 (20px)
- `.typography-subtitle1` - Subtitle 1 (20px, medium weight)
- `.typography-subtitle2` - Subtitle 2 (16px, semibold)
- `.typography-subtitle2-stronger` - Subtitle 2 stronger (16px, bold)
- `.typography-body1` - Body 1 (14px)
- `.typography-body1-strong` - Body 1 strong (14px, semibold)
- `.typography-body1-stronger` - Body 1 stronger (14px, bold)
- `.typography-body2` - Body 2 (16px)
- `.typography-caption1` - Caption 1 (12px)
- `.typography-caption1-strong` - Caption 1 strong (12px, semibold)
- `.typography-caption1-stronger` - Caption 1 stronger (12px, bold)
- `.typography-caption2` - Caption 2 (10px)
- `.typography-caption2-strong` - Caption 2 strong (10px, semibold)

## Generating Custom Presets

### Unified Preset with Multiple Themes

Generate a single preset with runtime theme switching:

```typescript
import { generateUnifiedPreset } from '@fluentui/tailwindcss';
import { webLightTheme, webDarkTheme, typographyStyles } from '@fluentui/tokens';
import { writeFileSync } from 'fs';

const css = generateUnifiedPreset(
  {
    'web-light': webLightTheme,
    'web-dark': webDarkTheme,
    'custom': {
      ...webLightTheme,
      colorBrandBackground: '#ff0000',
    },
  },
  typographyStyles,
  {
    defaultTheme: 'web-light',
    includeUtilities: true,
    utilityPrefix: 'typography',
  }
);

writeFileSync('custom-preset.css', css);
```

### Single Theme Preset

Generate a standalone theme preset:

```typescript
import { generatePreset } from '@fluentui/tailwindcss';
import { webLightTheme } from '@fluentui/tokens';
import { writeFileSync } from 'fs';

const customTheme = {
  ...webLightTheme,
  colorBrandBackground: '#ff0000',
  colorBrandForeground: '#ffffff',
};

const css = generatePreset(customTheme, {
  themeName: 'My Custom Theme',
});

writeFileSync('custom-theme.css', css);
```

## API Reference

### `generateUnifiedPreset(themes, typographyStyles?, options?)`

Generate a unified preset with multiple themes and runtime switching support.

**Parameters:**

- `themes: Record<string, ThemeTokens>` - Map of theme names to theme objects
- `typographyStyles?: Record<string, ThemeTokens>` - Typography style definitions (optional)
- `options?: UnifiedPresetOptions` - Configuration options

**Options:**

```typescript
interface UnifiedPresetOptions {
  defaultTheme?: 'web-light' | 'web-dark' | 'teams-light' | 'teams-dark';
  includeUtilities?: boolean; // default: true
  utilityPrefix?: string; // default: 'typography'
}
```

**Returns:** CSS string with `@theme`, `:root`, `[data-theme]` selectors, and `@utility` classes

### `generatePreset(theme, options?)`

Generate a single theme preset.

**Parameters:**

- `theme: ThemeTokens` - Fluent UI theme object
- `options?: PresetGeneratorOptions` - Configuration options

**Options:**

```typescript
interface PresetGeneratorOptions {
  themeName?: string;
  prefix?: string; // Custom CSS variable prefix
}
```

**Returns:** CSS string with `@theme` directive

### `generateUtilities(utilities, options?)`

Generate custom utility classes from style definitions.

**Parameters:**

- `utilities: Record<string, ThemeTokens>` - Style definitions
- `options?: UtilityGeneratorOptions` - Configuration options

**Options:**

```typescript
interface UtilityGeneratorOptions {
  prefix?: string; // default: 'fluent'
}
```

**Returns:** CSS string with `@utility` directives

## Architecture

The unified preset uses a layered architecture:

```css
/* Layer 1: Semantic API in @theme */
@theme {
  --color-primary: var(--fluent-color-brand-background);
  /* ... */
}

/* Layer 2: Shared tokens in :root */
:root {
  --fluent-font-size-base300: 14px;
  --fluent-spacing-horizontal-m: 12px;
  /* ... shared typography, spacing */

  /* Default theme (web-light) */
  --fluent-color-brand-background: #0078d4;
  /* ... */
}

/* Layer 3: Theme overrides */
[data-theme="web-dark"] {
  --fluent-color-brand-background: #479ef5;
  /* ... only color/shadow overrides */
}

/* Layer 4: Custom utilities */
@utility typography-body1 {
  font-family: var(--fluent-font-family-base);
  /* ... */
}
```

This architecture:

- ✅ Minimizes CSS size (shared tokens defined once)
- ✅ Enables runtime theme switching (no page reload)
- ✅ Provides semantic API layer for common patterns
- ✅ Maintains direct access to all Fluent tokens

## Examples

### Complete React Example

```tsx
import { useState } from 'react';
import './app.css'; // imports @fluentui/tailwindcss/presets/preset.css

type Theme = 'web-light' | 'web-dark' | 'teams-light' | 'teams-dark';

function App() {
  const [theme, setTheme] = useState<Theme>('web-light');

  // Apply theme to document
  document.documentElement.setAttribute('data-theme', theme);

  return (
    <div className="min-h-screen bg-neutral-background1 text-neutral-foreground1">
      <header className="border-b border-neutral-stroke1 px-[--spacingHorizontalL] py-[--spacingVerticalM]">
        <h1 className="typography-title2">Fluent UI + Tailwind CSS</h1>
      </header>

      <main className="p-[--spacingHorizontalXL]">
        <div className="flex gap-x-[--spacingHorizontalS]">
          <button
            onClick={() => setTheme('web-light')}
            className="px-[--spacingHorizontalM] py-[--spacingVerticalS] bg-brand-background text-brand-foreground1 rounded-medium"
          >
            Light
          </button>
          <button
            onClick={() => setTheme('web-dark')}
            className="px-[--spacingHorizontalM] py-[--spacingVerticalS] bg-brand-background text-brand-foreground1 rounded-medium"
          >
            Dark
          </button>
        </div>

        <p className="typography-body1 mt-[--spacingVerticalL]">
          The theme switches instantly without reloading the page!
        </p>
      </main>
    </div>
  );
}
```

## Design Token Reference

### Colors (Tailwind Classes)

All Fluent UI color tokens are available as Tailwind utility classes:

- Neutral foregrounds: `text-neutral-foreground1`, `text-neutral-foreground2`, `text-neutral-foreground3`, etc.
- Neutral backgrounds: `bg-neutral-background1`, `bg-neutral-background2`, `bg-neutral-background3`, etc.
- Brand colors: `bg-brand-background`, `text-brand-foreground1`, `bg-brand-background2`, etc.
- Compound brand: `bg-compound-brand-background`, `text-compound-brand-foreground1`, etc.
- Strokes/borders: `border-neutral-stroke1`, `border-neutral-stroke2`, `border-brand-stroke1`, etc.
- Status colors: `bg-status-success-background1`, `bg-status-warning-background1`, `bg-status-danger-background1`, etc.

**Usage:**

```html
<div class="bg-neutral-background1 text-neutral-foreground1 border-neutral-stroke1">
  Content
</div>
```

### Typography (Utility Classes)

Typography utilities are available as classnames:

- `.typography-display` - Display text (68px)
- `.typography-large-title` - Large title (40px)
- `.typography-title1` - Title 1 (28px)
- `.typography-title2` - Title 2 (24px)
- `.typography-title3` - Title 3 (20px)
- `.typography-subtitle1` - Subtitle 1 (20px, medium weight)
- `.typography-subtitle2` - Subtitle 2 (16px, semibold)
- `.typography-subtitle2-stronger` - Subtitle 2 stronger (16px, bold)
- `.typography-body1` - Body 1 (14px)
- `.typography-body1-strong` - Body 1 strong (14px, semibold)
- `.typography-body1-stronger` - Body 1 stronger (14px, bold)
- `.typography-body2` - Body 2 (16px)
- `.typography-caption1` - Caption 1 (12px)
- `.typography-caption1-strong` - Caption 1 strong (12px, semibold)
- `.typography-caption1-stronger` - Caption 1 stronger (12px, bold)
- `.typography-caption2` - Caption 2 (10px)
- `.typography-caption2-strong` - Caption 2 strong (10px, semibold)

**Font sizes (Tailwind classes):**

- `text-base100`, `text-base200`, `text-base300`, `text-base400`, `text-base500`, `text-base600`
- `text-hero700`, `text-hero800`, `text-hero900`, `text-hero1000`

**Line heights (Tailwind classes):**

- `leading-base100`, `leading-base200`, `leading-base300`, `leading-base400`, `leading-base500`, `leading-base600`
- `leading-hero700`, `leading-hero800`, `leading-hero900`, `leading-hero1000`

**Font weights (Tailwind classes):**

- `font-weight-regular`, `font-weight-medium`, `font-weight-semibold`, `font-weight-bold`

### Border Radius (Tailwind Classes)

- `rounded-none`, `rounded-small`, `rounded-medium`, `rounded-large`, `rounded-x-large`, `rounded-circular`

### Border Widths (Tailwind Classes)

- `border-width-thin`, `border-width-thick`, `border-width-thicker`, `border-width-thickest`

### Spacing (CSS Variables)

Use spacing tokens with Tailwind's arbitrary value syntax:

**Horizontal spacing:**

- `--spacingHorizontalNone`, `--spacingHorizontalXXS`, `--spacingHorizontalXS`, `--spacingHorizontalSNudge`, `--spacingHorizontalS`, `--spacingHorizontalMNudge`, `--spacingHorizontalM`, `--spacingHorizontalL`, `--spacingHorizontalXL`, `--spacingHorizontalXXL`, `--spacingHorizontalXXXL`

**Vertical spacing:**

- `--spacingVerticalNone`, `--spacingVerticalXXS`, `--spacingVerticalXS`, `--spacingVerticalSNudge`, `--spacingVerticalS`, `--spacingVerticalMNudge`, `--spacingVerticalM`, `--spacingVerticalL`, `--spacingVerticalXL`, `--spacingVerticalXXL`, `--spacingVerticalXXXL`

**Usage:**

```html
<div class="px-[--spacingHorizontalM] py-[--spacingVerticalS]">
  Content with Fluent spacing
</div>
```

### Shadows (Tailwind Classes)

- Elevation shadows: `shadow-2`, `shadow-4`, `shadow-8`, `shadow-16`, `shadow-28`, `shadow-64`
- Brand shadows: `shadow-2-brand`, `shadow-4-brand`, `shadow-8-brand`, `shadow-16-brand`, `shadow-28-brand`, `shadow-64-brand`

### Easing Functions (Tailwind Classes)

- `ease-accelerate-max`, `ease-accelerate-mid`, `ease-accelerate-min`
- `ease-decelerate-max`, `ease-decelerate-mid`, `ease-decelerate-min`
- `ease-easy-ease-max`, `ease-easy-ease`, `ease-linear`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Related

- [@fluentui/tokens](https://www.npmjs.com/package/@fluentui/tokens) - Official Fluent UI design tokens
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Fluent UI](https://react.fluentui.dev/) - Microsoft's official React component library
