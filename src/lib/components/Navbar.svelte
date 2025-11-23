<script lang="ts">
	import ThemeToggle from "./ThemeToggle.svelte";
	import { page } from "$app/stores";

	let mobileMenuOpen = false;

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/pemikiran", label: "Pemikiran" },
		{ href: "/proses", label: "Proses" },
		{ href: "/projects", label: "Projects" },
		{ href: "/about", label: "About" },
		{ href: "/panduan", label: "Panduan" },
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<header
	class="py-6 md:py-8 mb-8 md:mb-12 border-b border-gray-100 dark:border-gray-800"
>
	<div class="mb-6 md:mb-8">
		<h1
			class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2"
		>
			<a
				href="/"
				class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>shidiq</a
			>
		</h1>
		<h4
			class="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium"
		>
			seseorang yang berusaha untuk hidup
		</h4>
	</div>

	<nav>
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center justify-between">
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
		</div>

		<!-- Mobile Navigation -->
		<div class="md:hidden">
			<div class="flex items-center justify-between">
				<button
					on:click={toggleMobileMenu}
					class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<!-- Close Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<!-- Hamburger Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
				<ThemeToggle />
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div
					class="mt-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4"
				>
					{#each links as link}
						<a
							href={link.href}
							on:click={closeMobileMenu}
							class="block px-3 py-2 rounded-md text-base font-medium transition-colors
							{$page.url.pathname === link.href
								? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
								: 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'}"
						>
							{link.label}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</nav>
</header>
