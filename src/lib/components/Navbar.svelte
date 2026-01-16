<script lang="ts">
	import ThemeToggle from "./ThemeToggle.svelte";
	import { page } from "$app/stores";
	import { fly, fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	let mobileMenuOpen = false;
	let searchOpen = false;
	let searchQuery = "";
	let searchInput: HTMLInputElement;

	const links = [
		{ href: "/", label: "Home" },
		{
			label: "Kategori",
			children: [
				{ href: "/pemikiran", label: "Pemikiran" },
				{ href: "/proses", label: "Proses" },
			],
		},
		{ href: "/projects", label: "Projects" },
		{ href: "/about", label: "About" },
		// { href: "/panduan", label: "Panduan" },
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function toggleSearch() {
		searchOpen = !searchOpen;
		if (searchOpen) {
			setTimeout(() => searchInput?.focus(), 100);
		}
	}

	function handleSearch(e: KeyboardEvent) {
		if (e.key === "Enter" && searchQuery.trim()) {
			goto(`/search?q=${encodeURIComponent(searchQuery)}`);
			searchOpen = false;
			searchQuery = "";
		}
	}
</script>

<header
	class="py-4 md:py-5 mb-3 md:mb-4 border-b border-gray-100 dark:border-gray-800 relative"
>
	<div class="mb-3 md:mb-4">
		<h1
			class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 font-heading"
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
					{#if link.children}
						<div class="relative group">
							<button
								class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
							>
								{link.label}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							<div
								class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
							>
								{#each link.children as child}
									<a
										href={child.href}
										class="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
									>
										{child.label}
									</a>
								{/each}
							</div>
						</div>
					{:else}
						<a
							href={link.href}
							class="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white
							{$page.url.pathname === link.href
								? 'text-gray-900 dark:text-white'
								: 'text-gray-500 dark:text-gray-400'}"
						>
							{link.label}
						</a>
					{/if}
				{/each}
			</div>
			<div class="flex items-center gap-4">
				<button
					on:click={toggleSearch}
					class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
					aria-label="Search"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
				<ThemeToggle />
			</div>
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
				<div class="flex items-center gap-2">
					<button
						on:click={toggleSearch}
						class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
						aria-label="Search"
					>
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
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<ThemeToggle />
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div
					class="mt-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4"
					transition:fly={{ y: -20, duration: 200 }}
				>
					{#each links as link}
						{#if link.children}
							<div class="space-y-1">
								<div
									class="px-3 py-2 text-base font-medium text-gray-900 dark:text-white"
								>
									{link.label}
								</div>
								{#each link.children as child}
									<a
										href={child.href}
										on:click={closeMobileMenu}
										class="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
									>
										{child.label}
									</a>
								{/each}
							</div>
						{:else}
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
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</nav>

	<!-- Search Overlay -->
	{#if searchOpen}
		<!-- Backdrop Button -->
		<button
			class="fixed inset-0 z-40 bg-transparent cursor-default"
			on:click={toggleSearch}
			on:keydown={(e) => e.key === "Escape" && toggleSearch()}
			transition:fade={{ duration: 150 }}
			aria-label="Close search overlay"
			tabindex="-1"
		></button>
		<!-- Search Box -->
		<div
			class="absolute top-full left-0 right-0 mt-2 mx-4 md:mx-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl"
			transition:fly={{ y: -10, duration: 150 }}
		>
			<div class="flex items-center gap-3 px-4 py-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-400 flex-shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					bind:this={searchInput}
					bind:value={searchQuery}
					on:keydown={handleSearch}
					type="text"
					placeholder="Ketik dan tekan Enter..."
					class="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-400"
				/>
				<button
					on:click={toggleSearch}
					class="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
					aria-label="Close search"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
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
				</button>
			</div>
		</div>
	{/if}
</header>
