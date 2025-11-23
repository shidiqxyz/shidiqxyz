<script lang="ts">
	import ThemeToggle from "./ThemeToggle.svelte";
	import { page } from "$app/stores";

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/pemikiran", label: "Pemikiran" },
		{ href: "/proses", label: "Proses" },
		{ href: "/projects", label: "Projects" },
		{ href: "/about", label: "About" },
		{ href: "/panduan", label: "Panduan" },
	];
</script>

<header class="py-8 mb-12 border-b border-gray-100 dark:border-gray-800">
	<div class="mb-8">
		<h1
			class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2"
		>
			<a
				href="/"
				class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>shidiq</a
			>
		</h1>
		<h4 class="text-lg text-gray-500 dark:text-gray-400 font-medium">
			seseorang yang berusaha untuk hidup
		</h4>
	</div>

	<nav class="flex items-center justify-between">
		<div class="flex items-center gap-6">
			{#each links as link}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white
					{$page.url.pathname === link.href
						? 'text-gray-900 dark:text-white'
						: 'text-gray-500 dark:text-gray-400'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
		<ThemeToggle />
	</nav>
</header>
