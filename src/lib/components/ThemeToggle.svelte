<script lang="ts">
	import { onMount } from "svelte";
	import { Sun, Moon } from "lucide-svelte";

	const STORAGE_KEY = "theme";
	type StoredTheme = "light" | "dark" | null;

	function getStoredTheme(): StoredTheme {
		try {
			const value = localStorage.getItem(STORAGE_KEY);
			return value === "light" || value === "dark" ? value : null;
		} catch {
			return null;
		}
	}

	function applyTheme(stored: StoredTheme) {
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const isDark = stored ? stored === "dark" : systemDark;

		// Keep Tailwind's class strategy and the browser's color-scheme in sync.
		document.documentElement.classList.toggle("dark", isDark);
		document
			.querySelector('meta[name="color-scheme"]')
			?.setAttribute("content", stored ?? "light dark");
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute("content", isDark ? "#111827" : "#ffffff");
	}

	function toggleTheme() {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const stored = getStoredTheme();
		const isDark = stored ? stored === "dark" : media.matches;
		const target = isDark ? "light" : "dark";
		const targetMatchesSystem = (target === "dark") === media.matches;

		// A two-state toggle represents "follow system" and "override". Choosing
		// the current system scheme means the user is undoing their override.
		try {
			if (targetMatchesSystem) localStorage.removeItem(STORAGE_KEY);
			else localStorage.setItem(STORAGE_KEY, target);
		} catch {
			// Theme still works for this page when storage is blocked.
		}

		applyTheme(targetMatchesSystem ? null : target);
	}

	onMount(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		// The inline script in app.html already applied the initial state; this
		// keeps things correct if the component hydrates late or in another tab.
		applyTheme(getStoredTheme());

		const onSystemChange = () => {
			if (!getStoredTheme()) applyTheme(null);
		};
		const onStorage = (event: StorageEvent) => {
			if (event.key !== STORAGE_KEY) return;
			const value =
				event.newValue === "light" || event.newValue === "dark"
					? event.newValue
					: null;
			applyTheme(value);
		};

		media.addEventListener("change", onSystemChange);
		window.addEventListener("storage", onStorage);

		return () => {
			media.removeEventListener("change", onSystemChange);
			window.removeEventListener("storage", onStorage);
		};
	});
</script>

<button
	type="button"
	on:click={toggleTheme}
	class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
>
	<span class="theme-icon theme-icon-light">
		<Sun class="w-5 h-5 text-gray-800 dark:text-gray-200" aria-hidden="true" />
	</span>
	<span class="theme-icon theme-icon-dark">
		<Moon class="w-5 h-5 text-gray-800 dark:text-gray-200" aria-hidden="true" />
	</span>
	<span class="sr-only theme-label theme-label-light">Aktifkan tema gelap</span>
	<span class="sr-only theme-label theme-label-dark">Aktifkan tema terang</span>
</button>

<style>
	.theme-icon-dark,
	.theme-label-dark {
		display: none;
	}

	:global(html.dark) .theme-icon-light,
	:global(html.dark) .theme-label-light {
		display: none;
	}

	:global(html.dark) .theme-icon-dark {
		display: block;
	}

	:global(html.dark) .theme-label-dark {
		display: inline;
	}
</style>
