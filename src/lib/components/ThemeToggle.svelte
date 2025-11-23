<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'lucide-svelte';

	let isDark = false;

	onMount(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = false;
			document.documentElement.classList.remove('dark');
		}
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	}
</script>

<button
	on:click={toggleTheme}
	class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
	aria-label="Toggle Dark Mode"
>
	{#if isDark}
		<Moon class="w-5 h-5 text-gray-800 dark:text-gray-200" />
	{:else}
		<Sun class="w-5 h-5 text-gray-800 dark:text-gray-200" />
	{/if}
</button>
