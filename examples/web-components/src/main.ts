import "./style.css";

import { setTheme } from "@fluentui/web-components";
import {
  teamsDarkTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
  teamsHighContrastTheme,
} from "@fluentui/tokens";

import "@fluentui/web-components/button.js";

setTheme(webLightTheme);

const themeMap = {
  "web-light": webLightTheme,
  "web-dark": webDarkTheme,
  "teams-light": teamsLightTheme,
  "teams-dark": teamsDarkTheme,
  "high-contrast": teamsHighContrastTheme,
} as const;

document.querySelectorAll("fluent-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const theme = (event.target as HTMLElement).dataset
      ?.theme as keyof typeof themeMap;

    setTheme(themeMap[theme]);
  });
});
