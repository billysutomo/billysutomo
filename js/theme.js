(() => {
    const STORAGE_KEY = "theme";
    const body = document.body;

    const applyTheme = (theme) => {
        body.setAttribute("data-theme", theme);
    };

    const getInitialTheme = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    };

    const toggleTheme = () => {
        const current = body.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    };

    // initialize
    applyTheme(getInitialTheme());

    // keyboard shortcut ⌘/Ctrl + K
    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            toggleTheme();
        }
    });

    // button hook
    const btn = document.getElementById("theme-toggle");
    if (btn) {
        btn.addEventListener("click", toggleTheme);
    }

    // expose for any inline handlers (not used now)
    window.toggleTheme = toggleTheme;
})();
