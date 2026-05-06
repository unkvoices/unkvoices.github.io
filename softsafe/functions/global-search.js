(() => {
  function runGlobalSearch(event) {
    const searchBar = document.getElementById("search-bar");
    if (!searchBar) return;

    const raw = searchBar.value || "";
    const query = raw.trim();

    if (!query) return;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
    }

    const targetUrl = `info.html#busca?q=${encodeURIComponent(query)}`;
    window.location.href = targetUrl;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");

    if (!searchBar || !searchButton) return;

    searchButton.addEventListener("click", runGlobalSearch, true);
    searchBar.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          runGlobalSearch(event);
        }
      },
      true
    );

    const moreItems = document.querySelectorAll(".nav-more");
    moreItems.forEach((item) => {
      const btn = item.querySelector(".nav-more-btn");
      if (!btn) return;

      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !item.classList.contains("open");
        moreItems.forEach((m) => m.classList.remove("open"));
        item.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    document.addEventListener("click", (event) => {
      moreItems.forEach((item) => {
        if (!item.contains(event.target)) {
          item.classList.remove("open");
          const btn = item.querySelector(".nav-more-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
    });

    const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
    const isAppLayout = document.body.classList.contains("app-layout");
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const collapsedKey = "softsafe_sidebar_collapsed";

    function applySidebarState(collapsed) {
      if (!isAppLayout) return;
      document.body.classList.toggle("sidebar-collapsed", collapsed && desktopQuery.matches);
      if (sidebarToggleBtn) {
        sidebarToggleBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
        sidebarToggleBtn.setAttribute("aria-label", collapsed ? "Abrir menu lateral" : "Fechar menu lateral");
        const icon = sidebarToggleBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-bars", "fa-xmark");
          icon.classList.add(collapsed ? "fa-bars" : "fa-xmark");
        }
      }
    }

    if (isAppLayout) {
      const saved = localStorage.getItem(collapsedKey) === "1";
      applySidebarState(saved);

      if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener("click", () => {
          const next = !document.body.classList.contains("sidebar-collapsed");
          localStorage.setItem(collapsedKey, next ? "1" : "0");
          applySidebarState(next);
        });
      }

      desktopQuery.addEventListener("change", () => {
        const savedNow = localStorage.getItem(collapsedKey) === "1";
        applySidebarState(savedNow);
      });
    }
  });
})();
