import { describe, it, expect } from "vitest";
import type { Theme } from "@fluentui/tokens";
import tokens from "@fluentui/tokens";
import {
  generateThemePreset,
  generateThemesPreset,
  generateTypographyUtilities,
} from "../src/generator";

const {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  typographyStyles,
} = tokens;

describe("generateThemePreset", () => {
  it("should generate a theme preset with @theme directive", () => {
    const result = generateThemePreset(webLightTheme);

    expect(result).toContain("@theme {");
    expect(result).toContain("--*: initial;");
    expect(result).toContain("}");
  });

  it("should convert theme tokens to Tailwind CSS variables", () => {
    const result = generateThemePreset(webLightTheme);

    // Check that various token types are converted correctly
    // Font sizes should be converted to --text-*
    const hasFontSize = Object.keys(webLightTheme).some((key) =>
      key.startsWith("fontSize"),
    );
    if (hasFontSize) {
      expect(result).toMatch(/--text-[\w-]+:\s*var\(--fontSize[\w]+\)/);
    }

    // Line heights should be converted to --leading-*
    const hasLineHeight = Object.keys(webLightTheme).some((key) =>
      key.startsWith("lineHeight"),
    );
    if (hasLineHeight) {
      expect(result).toMatch(/--leading-[\w-]+:\s*var\(--lineHeight[\w]+\)/);
    }

    // Font families should be converted to --font-*
    const hasFontFamily = Object.keys(webLightTheme).some((key) =>
      key.startsWith("fontFamily"),
    );
    if (hasFontFamily) {
      expect(result).toMatch(/--font-[\w-]+:\s*var\(--fontFamily[\w]+\)/);
    }

    // Font weights should be converted to --font-weight-*
    const hasFontWeight = Object.keys(webLightTheme).some((key) =>
      key.startsWith("fontWeight"),
    );
    if (hasFontWeight) {
      expect(result).toMatch(
        /--font-weight-[\w-]+:\s*var\(--fontWeight[\w]+\)/,
      );
    }

    // Border radius should be converted to --radius-*
    const hasBorderRadius = Object.keys(webLightTheme).some((key) =>
      key.startsWith("borderRadius"),
    );
    if (hasBorderRadius) {
      expect(result).toMatch(/--radius-[\w-]+:\s*var\(--borderRadius[\w]+\)/);
    }

    // Shadows should be converted to --shadow-*
    const hasShadow = Object.keys(webLightTheme).some((key) =>
      key.startsWith("shadow"),
    );
    if (hasShadow) {
      expect(result).toMatch(/--shadow-[\w-]+:\s*var\(--shadow[\w]+\)/);
    }
  });

  it("should exclude spacing and duration tokens", () => {
    const result = generateThemePreset(webLightTheme);

    // Verify that spacing and duration tokens are not included
    const lines = result.split("\n");
    const spacingLines = lines.filter(
      (line) => line.includes("spacing") && !line.includes("--*: initial"),
    );
    const durationLines = lines.filter(
      (line) => line.includes("duration") && !line.includes("--*: initial"),
    );

    expect(spacingLines.length).toBe(0);
    expect(durationLines.length).toBe(0);
  });

  it("should handle empty theme object", () => {
    const theme = {} as Theme;
    const result = generateThemePreset(theme);

    expect(result).toContain("@theme {");
    expect(result).toContain("--*: initial;");
    expect(result).toContain("}");
  });

  it("should handle PascalCase token names", () => {
    const result = generateThemePreset(webLightTheme);

    // Check that color tokens are properly converted
    const hasColorTokens = Object.keys(webLightTheme).some((key) =>
      key.startsWith("color"),
    );
    if (hasColorTokens) {
      // Should have kebab-case variable names
      expect(result).toMatch(/--color-[\w-]+:\s*var\(--color[\w]+\)/);
    }
  });

  it("should generate valid CSS with real theme data", () => {
    const result = generateThemePreset(webLightTheme);

    // Should have multiple theme tokens
    const variableLines = result
      .split("\n")
      .filter((line) => line.includes(": var(--"));
    expect(variableLines.length).toBeGreaterThan(0);
  });
});

describe("generateThemesPreset", () => {
  it("should generate a themes preset with :root and data-theme selectors", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    expect(result).toContain(":root {");
    expect(result).toContain('[data-theme="web-light"] {');
    expect(result).toContain('[data-theme="web-dark"] {');
  });

  it("should place common tokens in :root", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    // Find tokens that are the same in both themes - they should be in :root
    const commonKeys = Object.keys(webLightTheme).filter((key) => {
      const lightValue = webLightTheme[key as keyof Theme];
      const darkValue = webDarkTheme[key as keyof Theme];
      return lightValue === darkValue;
    });

    if (commonKeys.length > 0) {
      const firstCommonKey = commonKeys[0];
      const cssVarName = `--${firstCommonKey}`;
      const value = webLightTheme[firstCommonKey as keyof Theme];

      // Check that common tokens are in :root
      expect(result).toContain(`${cssVarName}: ${value}`);
      expect(result).toMatch(
        new RegExp(
          `:\\s*root\\s*\\{[\\s\\S]*${cssVarName}:\\s*${String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        ),
      );
    }
  });

  it("should place theme-specific tokens in data-theme selectors", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    // Find tokens that differ between themes - they should be in theme-specific selectors
    const differentKeys = Object.keys(webLightTheme).filter((key) => {
      const lightValue = webLightTheme[key as keyof Theme];
      const darkValue = webDarkTheme[key as keyof Theme];
      return lightValue !== darkValue;
    });

    if (differentKeys.length > 0) {
      const firstDifferentKey = differentKeys[0];
      const cssVarName = `--${firstDifferentKey}`;
      const lightValue = webLightTheme[firstDifferentKey as keyof Theme];
      const darkValue = webDarkTheme[firstDifferentKey as keyof Theme];

      // Check that different tokens are in theme-specific selectors
      expect(result).toMatch(
        new RegExp(
          `\\[data-theme="web-light"\\]\\s*\\{[\\s\\S]*${cssVarName}:\\s*${String(lightValue).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        ),
      );
      expect(result).toMatch(
        new RegExp(
          `\\[data-theme="web-dark"\\]\\s*\\{[\\s\\S]*${cssVarName}:\\s*${String(darkValue).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        ),
      );
    }
  });

  it("should use the specified default theme", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
    };

    const result = generateThemesPreset(themes, "web-dark");

    expect(result).toContain("/* Shared tokens - theme-independent */");
    expect(result).toContain('[data-theme="web-dark"] {');
  });

  it("should throw error when no themes provided", () => {
    expect(() => {
      generateThemesPreset({}, "web-light");
    }).toThrow("At least one theme must be provided");
  });

  it("should throw error when default theme not found", () => {
    const themes = {
      "web-light": webLightTheme,
    };

    expect(() => {
      generateThemesPreset(themes, "non-existent");
    }).toThrow('Default theme "non-existent" not found in themes');
  });

  it("should handle single theme", () => {
    const themes = {
      "web-light": webLightTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    expect(result).toContain(":root {");
    expect(result).toContain('[data-theme="web-light"] {');
  });

  it("should handle multiple themes correctly", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
      "teams-light": teamsLightTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    expect(result).toContain('[data-theme="web-light"] {');
    expect(result).toContain('[data-theme="web-dark"] {');
    expect(result).toContain('[data-theme="teams-light"] {');
  });

  it("should include theme comments", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    expect(result).toContain("/* Theme: web-light */");
    expect(result).toContain("/* Theme: web-dark */");
  });

  it("should work with all available themes", () => {
    const themes = {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
      "teams-light": teamsLightTheme,
      "teams-dark": teamsDarkTheme,
      "high-contrast": teamsHighContrastTheme,
    };

    const result = generateThemesPreset(themes, "web-light");

    expect(result).toContain('[data-theme="web-light"] {');
    expect(result).toContain('[data-theme="web-dark"] {');
    expect(result).toContain('[data-theme="teams-light"] {');
    expect(result).toContain('[data-theme="teams-dark"] {');
    expect(result).toContain('[data-theme="high-contrast"] {');
  });
});

describe("generateTypographyUtilities", () => {
  it("should generate typography utilities with @utility directive", () => {
    const result = generateTypographyUtilities(typographyStyles);

    expect(result).toContain("/* Custom Typography Utilities */");

    // Check that at least one utility is generated
    const utilityMatches = result.match(/@utility typography-[\w-]+ \{/g);
    expect(utilityMatches).toBeTruthy();
    expect(utilityMatches!.length).toBeGreaterThan(0);
  });

  it("should convert camelCase style names to kebab-case", () => {
    const result = generateTypographyUtilities(typographyStyles);

    // Get the first style name from typographyStyles
    const firstStyleName = Object.keys(typographyStyles)[0];
    if (firstStyleName) {
      const kebabName = firstStyleName
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
      expect(result).toContain(`@utility typography-${kebabName} {`);
    }
  });

  it("should convert camelCase property names to kebab-case", () => {
    const result = generateTypographyUtilities(typographyStyles);

    // Check that properties are converted to kebab-case
    const hasFontFamily = result.includes("font-family:");
    const hasFontSize = result.includes("font-size:");
    const hasLineHeight = result.includes("line-height:");
    const hasFontWeight = result.includes("font-weight:");

    // At least some of these should be present
    const hasTypographicProperties =
      hasFontFamily || hasFontSize || hasLineHeight || hasFontWeight;
    expect(hasTypographicProperties).toBe(true);
  });

  it("should handle multiple typography styles", () => {
    const result = generateTypographyUtilities(typographyStyles);

    const styleCount = Object.keys(typographyStyles).length;
    const utilityMatches = result.match(/@utility typography-[\w-]+ \{/g);

    expect(utilityMatches).toBeTruthy();
    expect(utilityMatches!.length).toBe(styleCount);
  });

  it("should handle empty typography styles object", () => {
    const emptyStyles = {};
    const result = generateTypographyUtilities(emptyStyles);

    expect(result).toContain("/* Custom Typography Utilities */");
    expect(result).not.toContain("@utility");
  });

  it("should handle numeric values", () => {
    const result = generateTypographyUtilities(typographyStyles);

    // Check that numeric values are handled (font-weight, line-height, etc.)
    // Look for numeric values in the output
    const numericValuePattern = /:\s*\d+(\.\d+)?;/;
    const hasNumericValues = numericValuePattern.test(result);

    // Some typography styles may have numeric values
    // This is a soft check - if there are numeric values, they should be formatted correctly
    if (hasNumericValues) {
      expect(result).toMatch(/font-weight:\s*\d+;/);
    }
  });

  it("should handle PascalCase style names", () => {
    // Create a test with PascalCase names
    const pascalCaseStyles = {
      Title1: {
        fontSize: "20px",
      },
      BodyLarge: {
        fontSize: "16px",
      },
    };

    const result = generateTypographyUtilities(pascalCaseStyles);

    expect(result).toContain("@utility typography-title1 {");
    expect(result).toContain("@utility typography-body-large {");
  });

  it("should handle complex property names", () => {
    const result = generateTypographyUtilities(typographyStyles);

    // Check for various property name conversions
    const hasLetterSpacing = result.includes("letter-spacing:");
    const hasTextTransform = result.includes("text-transform:");
    const hasFontFamily = result.includes("font-family:");

    // At least font-family should be present
    expect(hasFontFamily).toBe(true);
  });

  it("should work with actual typography styles from Fluent UI", () => {
    const result = generateTypographyUtilities(typographyStyles);

    // Should generate utilities for all typography styles
    const styleNames = Object.keys(typographyStyles);
    styleNames.forEach((styleName) => {
      const kebabName = styleName
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
      expect(result).toContain(`@utility typography-${kebabName} {`);
    });
  });
});
