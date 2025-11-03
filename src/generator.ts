import type { Theme } from "@fluentui/tokens";

/**
 * Convert a camelCase or PascalCase string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

type ThemeTokens = Partial<Theme> | Record<string, string | number>;

/**
 * Generate a preset for a single theme without theme-specific tokens
 * This is used to generate the preset.css file
 * 
 * @param theme - Theme object
 * @returns CSS string with @theme directive
 */
export function generateThemePreset(theme: Theme): string {
  const cssLines: string[] = [];

  cssLines.push("@theme {");
  cssLines.push("  --*: initial;");

  Object.keys(theme)
    .filter((key) => !key.startsWith("spacing") && !key.startsWith("duration"))
    .forEach((key) => {
      cssLines.push(
        `  ${convertFluentTokenToTailwindVariableName(
          key
        )}: var(${convertFluentTokenToCssVariableName(key)});`
      );
    });

  cssLines.push("}");

  return cssLines.join("\n");
}

/**
 * Generate a preset with all themes and theme-specific tokens
 * This is used to generate the preset-themes.css file
 * 
 * @param themes - Record of theme names to theme objects
 * @param defaultTheme - Default theme name
 * @returns CSS string with @theme, :root and [data-theme] selectors
 */
export function generateThemesPreset(
  themes: Record<string, Theme>,
  defaultTheme: string = "web-light",
): string {
  const cssLines: string[] = [];
  const themeNames = Object.keys(themes);

  if (themeNames.length === 0) {
    throw new Error("At least one theme must be provided");
  }

  const defaultThemeObj = themes[defaultTheme];
  if (!defaultThemeObj) {
    throw new Error(`Default theme "${defaultTheme}" not found in themes`);
  }

  // Find common tokens across all themes
  const { common: commonTokens, themes: themeSpecificTokens } =
    getPresetThemeTokens(themes);

  // Generate :root with common tokens
  cssLines.push("/* Shared tokens - theme-independent */");
  cssLines.push(":root {");

  Object.entries(commonTokens).forEach(([name, value]) => {
    cssLines.push(`  ${name}: ${value};`);
  });

  cssLines.push("}");
  cssLines.push("");

  Object.entries(themeSpecificTokens).forEach(([themeName, themeTokens]) => {
    cssLines.push(`/* Theme: ${themeName} */`);
    cssLines.push(`[data-theme="${themeName}"] {`);
    Object.entries(themeTokens).forEach(([key, value]) => {
      cssLines.push(`  ${key}: ${value};`);
    });
    cssLines.push("}");
    cssLines.push("");
  });

  return cssLines.join("\n");
}

/**
 * Generate typography utilities from typography styles
 * This is used to generate the typography-utilities.css file
 * 
 * @param typographyStyles - Record of typography style names to properties
 * @returns CSS string with @utility directives
 */
export function generateTypographyUtilities(
  typographyStyles: Record<string, ThemeTokens>
): string {
  const cssLines: string[] = [];

  cssLines.push("/* Custom Typography Utilities */");
  cssLines.push("");

  Object.entries(typographyStyles).forEach(([styleName, properties]) => {
    const className = toKebabCase(styleName);

    cssLines.push(`@utility typography-${className} {`);

    Object.entries(properties).forEach(([prop, value]) => {
      cssLines.push(`  ${toKebabCase(prop)}: ${value};`);
    });

    cssLines.push("}");
    cssLines.push("");
  });

  return cssLines.join("\n");
}

/**
 * Convert Fluent UI token name to CSS variable name
 * @param tokenName - Fluent UI token name (e.g., "colorBackgroundNeutral")
 * @returns CSS variable name (e.g., "--color-background-neutral")
 */
function convertFluentTokenToCssVariableName(tokenName: string): string {
  return `--${tokenName}`;
}

/**
 * Convert Fluent UI token name to TailwindCSS variable name
 * Following TailwindCSS namespaces conventions
 * @param tokenName - Fluent UI token name
 * @returns Tailwind CSS variable name
 */
function convertFluentTokenToTailwindVariableName(tokenName: string): string {
  // Convert Fluent UI token name to TailwindCSS variable name
  // Following TailwindCSS namespaces conventions
  const kebab = toKebabCase(tokenName);

  // Font sizes: --text-*
  if (kebab.startsWith("font-size")) {
    return kebab.replace("font-size", "--text");
  }

  // Line heights: --leading-*
  if (kebab.startsWith("line-height")) {
    return kebab.replace("line-height", "--leading");
  }

  // Font families: --font-*
  if (kebab.startsWith("font-family")) {
    return kebab.replace("font-family", "--font");
  }

  // Font weights: --font-weight-*
  if (kebab.startsWith("font-weight")) {
    return kebab.replace("font-weight", "--font-weight");
  }

  // Border radius: --radius-*
  if (kebab.startsWith("border-radius")) {
    return kebab.replace("border-radius", "--radius");
  }

  // Border widths: --border-*
  if (kebab.startsWith("stroke")) {
    return kebab.replace("stroke", "--border");
  }

  // Shadows: --shadow-*
  if (kebab.startsWith("shadow")) {
    // add extra dash for shadow tokens
    return kebab.replace("shadow", "--shadow-");
  }

  // Easing curves: --ease-*
  if (kebab.startsWith("curve")) {
    return kebab.replace("curve", "--ease");
  }

  // Default: kebab-case with -- prefix
  return `--${kebab}`;
}

type PresetThemeTokens = {
  common: Record<string, string | number>;
  themes: Record<string, Record<string, string | number>>;
};

/**
 * Extract common and theme-specific tokens from themes
 */
function getPresetThemeTokens(
  themes: Record<string, Theme>
): PresetThemeTokens {
  const themeNames = Object.keys(themes);
  const defaultTheme = themes[themeNames[0]];

  if (!defaultTheme) {
    throw new Error("At least one theme must be provided");
  }

  const allTokenKeys = Object.keys(defaultTheme);
  const common: Record<string, string | number> = {};
  const themeSpecific: Record<string, Record<string, string | number>> = {};

  // Initialize theme-specific token storage
  themeNames.forEach((themeName) => {
    themeSpecific[themeName] = {};
  });

  // Categorize tokens as common or theme-specific
  allTokenKeys.forEach((key) => {
    const tokenKey = key as keyof Theme;
    const cssVarName = convertFluentTokenToCssVariableName(key);
    const isUnique =
      new Set(themeNames.map((themeName) => themes[themeName][tokenKey]))
        .size === 1;

    if (isUnique) {
      common[cssVarName] = defaultTheme[tokenKey] as string | number;
    } else {
      themeNames.forEach((themeName) => {
        const value = themes[themeName][tokenKey];
        themeSpecific[themeName][cssVarName] = value as string | number;
      });
    }
  });

  return {
    common,
    themes: themeSpecific,
  };
}
