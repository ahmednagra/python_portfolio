(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {
    /* localStorage unavailable (private mode, blocked storage) — fall back
       to the automatic prefers-color-scheme media query in globals.css. */
  }
})();
