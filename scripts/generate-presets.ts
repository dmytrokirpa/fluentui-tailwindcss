import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
  typographyStyles,
  teamsHighContrastTheme,
} = tokens;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const presetsDir = join(rootDir, "presets");

/**
 * Generate unified preset with all themes
 */
function generate(): void {
  console.log("Generating Tailwind CSS v4 preset from Fluent UI tokens...\n");

  // Create presets directory if it doesn't exist
  mkdirSync(presetsDir, { recursive: true });

  const themePreset = generateThemePreset(webLightTheme);
  const typographyUtilities = generateTypographyUtilities(typographyStyles);

  const themePresetFilepath = join(presetsDir, "preset.css");
  writeFileSync(
    themePresetFilepath,
    `${themePreset}\n${typographyUtilities}`,
    "utf8",
  );
  console.log("✓ Generated preset.css");

  // Generate unified preset with all themes
  const themesPreset = generateThemesPreset(
    {
      "web-light": webLightTheme,
      "web-dark": webDarkTheme,
      "teams-light": teamsLightTheme,
      "teams-dark": teamsDarkTheme,
      "high-contrast": teamsHighContrastTheme,
    },
    "web-light",
  );

  const themesPresetFilepath = join(presetsDir, "themes.css");
  writeFileSync(themesPresetFilepath, themesPreset, "utf8");

  console.log("✓ Generated preset-themes.css");
  console.log(
    "  - Themes: web-light (default), web-dark, teams-light, teams-dark",
  );

  console.log("\n✅ Preset generated successfully!\n");
}

// Run the generator
generate();
