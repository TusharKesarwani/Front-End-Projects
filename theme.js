(function () {
  const STORAGE_KEY = "theme";
  const DARK_CLASS = "dark-mode";

  function applySavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") {
      document.body.classList.add(DARK_CLASS);
    }
  }

  function syncButtonIcon(btn) {
    const icon = btn.querySelector("i");
    const isDark = document.body.classList.contains(DARK_CLASS);
    if (isDark) {
      icon.classList.replace("fa-moon", "fa-sun");
      btn.setAttribute("aria-label", "Switch to light mode");
      btn.setAttribute("title", "Switch to light mode");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      btn.setAttribute("aria-label", "Switch to dark mode");
      btn.setAttribute("title", "Switch to dark mode");
    }
  }

  function toggleTheme(btn) {
    document.body.classList.toggle(DARK_CLASS);
    const isDark = document.body.classList.contains(DARK_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    syncButtonIcon(btn);
  }

  // Run on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    applySavedTheme();

    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;

    syncButtonIcon(btn);

    btn.addEventListener("click", function () {
      toggleTheme(btn);
    });
  });

  applySavedTheme();
})();
