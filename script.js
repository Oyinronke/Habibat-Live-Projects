(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const storedTheme = (() => {
    try { return localStorage.getItem("habibat-theme"); } catch (_) { return null; }
  })();

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeButtons.forEach(button => {
      const label = button.querySelector(".theme-label");
      const icon = button.querySelector(".theme-icon");
      if (label) label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
      if (icon) icon.textContent = theme === "dark" ? "☼" : "☾";
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#071426" : "#f5f8ff");
  }

  applyTheme(storedTheme === "light" ? "light" : "dark");
  themeButtons.forEach(button => button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("habibat-theme", next); } catch (_) {}
  }));

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-card[data-category]");
  filters.forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach(filter => filter.classList.toggle("active", filter === button));
    cards.forEach(card => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  }));

  document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
})();
