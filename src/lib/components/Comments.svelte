<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    // REPLACE THESE WITH YOUR ACTUAL GISCUS IDS
    const REPO = "shidiqxyz/shidiqxyz";
    const REPO_ID = "R_kgDO..."; // TODO: Fill this from giscus.app
    const CATEGORY = "Announcements"; // or "General"
    const CATEGORY_ID = "DIC_kwDO..."; // TODO: Fill this from giscus.app

    let theme = "light";

    onMount(() => {
        // Detect current theme from html class or local storage
        if (
            document.documentElement.classList.contains("dark") ||
            localStorage.theme === "dark"
        ) {
            theme = "dark";
        }

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", REPO);
        script.setAttribute("data-repo-id", REPO_ID);
        script.setAttribute("data-category", CATEGORY);
        script.setAttribute("data-category-id", CATEGORY_ID);
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", theme); // dynamic theme
        script.setAttribute("data-lang", "id");
        script.setAttribute("data-loading", "lazy");
        script.crossOrigin = "anonymous";
        script.async = true;

        const container = document.getElementById("giscus-container");
        if (container) container.appendChild(script);

        // Optional: Listen for theme changes if you have a theme toggle event
        // (This part requires your ThemeToggle to emit an event or observer)
    });
</script>

<div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Komentar
    </h2>
    <div id="giscus-container"></div>
</div>
