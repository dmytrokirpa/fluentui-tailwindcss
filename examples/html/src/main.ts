import "./style.css";

// Theme switching
document
  .querySelectorAll<HTMLInputElement>("input[type='radio']")
  .forEach((input) => {
    input.addEventListener("change", (event) => {
      const theme = (event.target as HTMLInputElement).value as string;
      document.documentElement.setAttribute("data-theme", theme);
    });
  });

// Theme selector dropdown
const themeSelect = document.getElementById(
  "theme-select",
) as HTMLSelectElement;
const themeSelectMobile = document.getElementById(
  "theme-select-mobile",
) as HTMLSelectElement;

const handleThemeChange = (theme: string) => {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeSelect) themeSelect.value = theme;
  if (themeSelectMobile) themeSelectMobile.value = theme;
};

if (themeSelect) {
  themeSelect.addEventListener("change", (event) => {
    const theme = (event.target as HTMLSelectElement).value;
    handleThemeChange(theme);
  });
}

if (themeSelectMobile) {
  themeSelectMobile.addEventListener("change", (event) => {
    const theme = (event.target as HTMLSelectElement).value;
    handleThemeChange(theme);
  });
}

// Mobile drawer functionality
const hamburger = document.getElementById("hamburger");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const closeDrawer = document.getElementById("closeDrawer");
const navItems = document.querySelectorAll(".nav-item");

const openDrawer = () => {
  if (mobileDrawer && drawerBackdrop) {
    mobileDrawer.classList.remove("-translate-x-full");
    drawerBackdrop.classList.remove("opacity-0", "pointer-events-none");
    drawerBackdrop.classList.add("opacity-100", "pointer-events-auto");
  }
};

const closeMobileDrawer = () => {
  if (mobileDrawer && drawerBackdrop) {
    mobileDrawer.classList.add("-translate-x-full");
    drawerBackdrop.classList.remove("opacity-100", "pointer-events-auto");
    drawerBackdrop.classList.add("opacity-0", "pointer-events-none");
  }
};

if (hamburger) {
  hamburger.addEventListener("click", openDrawer);
}

if (closeDrawer) {
  closeDrawer.addEventListener("click", closeMobileDrawer);
}

if (drawerBackdrop) {
  drawerBackdrop.addEventListener("click", closeMobileDrawer);
}

// Close drawer when clicking nav items on mobile
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Check if we're on mobile (screen width < 1024px)
    if (window.innerWidth < 1024) {
      closeMobileDrawer();
    }
  });
});

// Handle window resize to close mobile drawer if window becomes large
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    closeMobileDrawer();
  }
});
