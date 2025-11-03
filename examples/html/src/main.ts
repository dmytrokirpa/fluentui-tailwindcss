import "./style.css";

import {
  teamsDarkTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
  teamsHighContrastTheme,
} from "@fluentui/tokens";

const themeMap = {
  "web-light": webLightTheme,
  "web-dark": webDarkTheme,
  "teams-light": teamsLightTheme,
  "teams-dark": teamsDarkTheme,
  "high-contrast": teamsHighContrastTheme,
} as const;

document
  .querySelectorAll<HTMLInputElement>("input[type='radio']")
  .forEach((input) => {
    input.addEventListener("change", (event) => {
      const theme = (event.target as HTMLInputElement)
        .value as keyof typeof themeMap;
      document.documentElement.setAttribute("data-theme", theme);
    });
  });
