import "./style.css";

document
  .querySelectorAll<HTMLInputElement>("input[type='radio']")
  .forEach((input) => {
    input.addEventListener("change", (event) => {
      const theme = (event.target as HTMLInputElement).value as string;
      document.documentElement.setAttribute("data-theme", theme);
    });
  });
