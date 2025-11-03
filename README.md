# fluentui-tailwindcss

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
npm install fluentui-tailwindcss
```

> **Note:** `@fluentui/tokens` is a optional peer dependency. If you're only using the pre-built CSS preset, you don't need to install it. However, if you want to generate custom presets programmatically, you'll need `@fluentui/tokens` installed.

## Quick Start

This library provides two CSS files that serve different purposes:

- **`preset.css`** - Maps Fluent UI design tokens to Tailwind CSS utility classes (e.g., `--colorBrandBackground` → `bg-brand-background`)
- **`themes.css`** - Defines the actual Fluent UI token values for all themes (optional, only needed for standalone usage)

Both files are available in the package:

- `fluentui-tailwindcss/presets/preset.css` - Also available as `fluentui-tailwindcss/preset.css`
- `fluentui-tailwindcss/presets/themes.css` - Defines token values and enables `data-theme` switching

### Which Pattern Should I Use?

| Your Setup                                  | Files to Import             | Why                                            |
| ------------------------------------------- | --------------------------- | ---------------------------------------------- |
| **Fluent UI React** (`FluentProvider`)      | `preset.css` only           | `FluentProvider` provides the Fluent UI tokens |
| **Fluent UI Web Components** (`setTheme()`) | `preset.css` only           | Web Components provide tokens via `setTheme()` |
| **Standalone HTML** (no Fluent UI library)  | `preset.css` + `themes.css` | You need both the mapping and the token values |

### Usage Pattern 1: Preset Only (Recommended for React/Web Components)

When using **Fluent UI React** (`FluentProvider`) or **Fluent UI Web Components**, they provide the Fluent UI tokens themselves. You only need the mapping layer:

```css
/* app.css */
@import "tailwindcss";
@import "fluentui-tailwindcss/presets/preset.css";

/* Your custom styles */
```

The `preset.css` file maps Fluent UI tokens to Tailwind classes, but doesn't define token values. Your Fluent UI library (React or Web Components) will provide the token values through `FluentProvider` or `setTheme()`.

**Example with React:**

```tsx
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      {/* FluentProvider provides tokens, preset.css maps them to Tailwind */}
      <div className="bg-neutral-background1 text-neutral-foreground1">
        Content
      </div>
    </FluentProvider>
  );
}
```

**Example with Web Components:**

```tsx
import { setTheme, webLightTheme } from "@fluentui/web-components";

setTheme(webLightTheme);
// Web Components provide tokens, preset.css maps them to Tailwind
```

### Usage Pattern 2: Preset + Themes (Standalone HTML)

For standalone HTML projects without Fluent UI React or Web Components, you need both files to get token values and runtime theme switching:

```css
/* app.css */
@import "tailwindcss";
@import "fluentui-tailwindcss/presets/preset.css";
@import "fluentui-tailwindcss/presets/themes.css";

/* Your custom styles */
```

> **Note:** You can also use `fluentui-tailwindcss/preset.css` (without `/presets/`) as a shorthand for `preset.css`.

The `themes.css` file defines all Fluent UI token values and enables runtime theme switching via the `data-theme` attribute:

```html
<!-- Default theme (web-light) -->
<html data-theme="web-light">
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

<!-- High contrast theme -->
<html data-theme="high-contrast">
  <body class="bg-neutral-background1 text-neutral-foreground1">
    <h1 class="typography-title1">High Contrast Theme</h1>
  </body>
</html>
```

### Available Themes

The unified preset includes:

- `web-light` (default) - Fluent UI Web Light theme
- `web-dark` - Fluent UI Web Dark theme
- `teams-light` - Microsoft Teams Light theme
- `teams-dark` - Microsoft Teams Dark theme
- `high-contrast` - High contrast theme for accessibility

### Runtime Theme Switching (with themes.css)

When using `themes.css`, you can switch themes dynamically with JavaScript:

```javascript
// Switch to dark theme
document.documentElement.setAttribute("data-theme", "web-dark");

// Switch to Teams light theme
document.documentElement.setAttribute("data-theme", "teams-light");

// Switch to high contrast theme
document.documentElement.setAttribute("data-theme", "high-contrast");

// Reset to default theme
document.documentElement.removeAttribute("data-theme");
```

## Using Design Tokens

The preset exposes Fluent UI design tokens as Tailwind CSS classes and CSS variables:

### 1. Tailwind CSS Classes (from `@theme`)

Tokens defined in `@theme` are available as standard Tailwind utility classes:

**Colors:**

```html
<!-- Use color tokens directly as Tailwind classes -->
<div class="bg-neutral-background1 text-neutral-foreground1">Content</div>

<div class="bg-brand-background text-brand-foreground1">Brand content</div>

<div class="border-neutral-stroke1">Border</div>
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
<div class="px-(--spacingHorizontalS) py-(--spacingVerticalM)">
  Fluent UI spacing
</div>

<!-- Margin -->
<div class="mx-(--spacingHorizontalL) my-(--spacingVerticalS)">
  Centered with Fluent spacing
</div>

<!-- Gap in flexbox/grid -->
<div class="flex gap-x-(--spacingHorizontalM) gap-y-(--spacingVerticalL)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Individual sides -->
<div class="ps-(--spacingHorizontalXS) pe-(--spacingHorizontalM)">
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
import { generateUnifiedPreset } from "fluentui-tailwindcss";
import {
  webLightTheme,
  webDarkTheme,
  typographyStyles,
} from "@fluentui/tokens";
import { writeFileSync } from "fs";

const css = generateUnifiedPreset(
  {
    "web-light": webLightTheme,
    "web-dark": webDarkTheme,
    custom: {
      ...webLightTheme,
      colorBrandBackground: "#ff0000",
    },
  },
  typographyStyles,
  {
    defaultTheme: "web-light",
    includeUtilities: true,
    utilityPrefix: "typography",
  },
);

writeFileSync("custom-preset.css", css);
```

### Single Theme Preset

Generate a standalone theme preset:

```typescript
import { generatePreset } from "fluentui-tailwindcss";
import { webLightTheme } from "@fluentui/tokens";
import { writeFileSync } from "fs";

const customTheme = {
  ...webLightTheme,
  colorBrandBackground: "#ff0000",
  colorBrandForeground: "#ffffff",
};

const css = generatePreset(customTheme, {
  themeName: "My Custom Theme",
});

writeFileSync("custom-theme.css", css);
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
  defaultTheme?:
    | "web-light"
    | "web-dark"
    | "teams-light"
    | "teams-dark"
    | "high-contrast";
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
  --color-primary: var(--colorBrandBackground);
  /* ... */
}

/* Layer 2: Shared tokens in :root */
:root {
  --fluent-font-size-base300: 14px;
  --fluent-spacing-horizontal-m: 12px;
  /* ... shared typography, spacing */

  /* Default theme (web-light) */
  --colorBrandBackground: #0078d4;
  /* ... */
}

/* Layer 3: Theme overrides */
[data-theme="web-dark"] {
  --colorBrandBackground: #479ef5;
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

This repository includes three complete example projects demonstrating different ways to use Fluent UI with Tailwind CSS:

### Running the Examples

Each example is a standalone project in the `examples/` directory. To run an example:

```bash
# Navigate to an example directory
cd examples/react  # or examples/html or examples/web-components

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### HTML Example

A simple vanilla HTML/TypeScript example showing basic theme switching and Fluent UI token usage:

**Location:** `examples/html/`

**Usage Pattern:** Preset + Themes (standalone)

**Features:**

- Radio button theme switcher
- All available themes (web-light, web-dark, teams-light, teams-dark, high-contrast)
- Basic component examples with status colors
- Runtime theme switching using `data-theme` attribute
- Uses both `preset.css` and `themes.css` for standalone token values

### React Example

A comprehensive React application demonstrating integration with `@fluentui/react-components`:

**Location:** `examples/react/`

**Usage Pattern:** Preset Only (FluentProvider provides tokens)

**Features:**

- Full dashboard-style layouts with stats cards
- Responsive sidebar and main content layouts
- Card grids with varied sizes
- Form layouts
- Integration with Fluent UI React components (Button, Card, Text, etc.)
- Theme switching using FluentProvider
- Uses only `preset.css` - FluentProvider provides the token values

### Web Components Example

An example using Fluent UI Web Components with Tailwind CSS:

**Location:** `examples/web-components/`

**Usage Pattern:** Preset Only (Web Components provide tokens)

**Features:**

- Fluent UI web components (`fluent-button`)
- Theme switching using `setTheme()` from `@fluentui/web-components`
- All available themes
- Simple, clean implementation
- Uses only `preset.css` - Web Components provide the token values via `setTheme()`

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
<div
  class="bg-neutral-background1 text-neutral-foreground1 border-neutral-stroke1"
>
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
<div class="px-(--spacingHorizontalM) py-(--spacingVerticalS)">
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
