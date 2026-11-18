<script lang="ts">
	import ThemeToggle from "./ThemeToggle.svelte";
	import { page } from "$app/stores";
	import { fly, fade } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { tick } from "svelte";

	let mobileMenuOpen = false;
	let searchOpen = false;
	let searchQuery = "";
	let searchInput: HTMLInputElement;

	let kategoriTrigger: HTMLButtonElement;
	let kategoriMenu: HTMLUListElement;
	let kategoriOpen = false;
	let hoverPreviewed = false;

	const links = [
		{ href: "/", label: "Beranda" },
		{
			label: "Kategori",
			children: [
				{ href: "/pemikiran", label: "Pemikiran" },
				{ href: "/proses", label: "Proses" },
				{ href: "/writeup", label: "Writeup" },
			],
		},
		{ href: "/panduan", label: "Panduan" },
		{ href: "/projects", label: "Projects" },
		{ href: "/about", label: "About" },
	];

	function isActive(href: string) {
		const path = $page.url.pathname;
		if (href === "/") return path === "/";
		if (path === href || path.startsWith(`${href}/`)) return true;

		// Blog posts live under /blog/<category>/<slug>.
		const categoryMatch = path.match(/^\/blog\/([^/]+)/);
		return categoryMatch ? href === `/${categoryMatch[1]}` : false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	async function toggleSearch() {
		searchOpen = !searchOpen;
		if (searchOpen) {
			await tick();
			searchInput?.focus();
		} else {
			searchQuery = "";
		}
	}

	function handleSearch(e: KeyboardEvent) {
		if (e.key === "Escape") {
			toggleSearch();
			return;
		}
		if (e.key === "Enter" && searchQuery.trim()) {
			goto(`/search?q=${encodeURIComponent(searchQuery)}`);
			searchOpen = false;
			searchQuery = "";
		}
	}

	function supportsAnchorPositioning() {
		return CSS.supports("anchor-name", "--kategori-trigger");
	}

	function positionKategoriMenu() {
		// Modern browsers position this with CSS Anchor Positioning; the JS
		// fallback keeps the menu attached in engines without it.
		if (supportsAnchorPositioning()) return;
		if (!kategoriTrigger || !kategoriMenu) return;

		const triggerRect = kategoriTrigger.getBoundingClientRect();
		const menuRect = kategoriMenu.getBoundingClientRect();
		const gap = 8;
		const margin = 16;

		let top = triggerRect.bottom + gap;
		if (top + menuRect.height > window.innerHeight - margin) {
			top = Math.max(margin, triggerRect.top - menuRect.height - gap);
		}

		const left = Math.min(
			Math.max(margin, triggerRect.left),
			window.innerWidth - menuRect.width - margin,
		);

		kategoriMenu.style.top = `${top}px`;
		kategoriMenu.style.left = `${left}px`;
	}

	function handleKategoriBeforeToggle(event: Event) {
		if ((event as ToggleEvent).newState !== "open") return;
		if (supportsAnchorPositioning() || !kategoriTrigger || !kategoriMenu) return;

		// Place the menu before it's painted when CSS Anchor Positioning is
		// unavailable. The estimate is refined after layout in `toggle`.
		const rect = kategoriTrigger.getBoundingClientRect();
		const estimatedHeight = 160;
		const margin = 16;
		const top =
			rect.bottom + 8 + estimatedHeight > window.innerHeight - margin
				? Math.max(margin, rect.top - estimatedHeight - 8)
				: rect.bottom + 8;
		const left = Math.min(
			Math.max(margin, rect.left),
			window.innerWidth - 216 - margin,
		);

		kategoriMenu.style.top = `${top}px`;
		kategoriMenu.style.left = `${left}px`;
	}

	function handleKategoriToggle(event: Event) {
		const open = (event as ToggleEvent).newState === "open";
		kategoriOpen = open;
		if (open) {
			requestAnimationFrame(positionKategoriMenu);
		} else {
			hoverPreviewed = false;
		}
	}

	function openKategoriPreview() {
		if (
			!window.matchMedia("(hover: hover)").matches ||
			!kategoriMenu ||
			kategoriMenu.matches(":popover-open")
		) {
			return;
		}
		hoverPreviewed = true;
		kategoriMenu.showPopover();
	}

	function closeKategoriPreview() {
		if (
			hoverPreviewed &&
			kategoriMenu?.matches(":popover-open")
		) {
			kategoriMenu.hidePopover();
		}
		hoverPreviewed = false;
	}

	function handleKategoriTriggerClick(event: MouseEvent) {
		// A click while hover-previewing should pin the menu open instead of
		// toggling it closed.
		if (hoverPreviewed && kategoriMenu?.matches(":popover-open")) {
			event.preventDefault();
			hoverPreviewed = false;
		}
	}

	function handleKategoriFocusOut(event: FocusEvent) {
		const current = event.currentTarget as HTMLElement;
		const next = event.relatedTarget as Node | null;
		if (next && current.contains(next)) return;
		if (kategoriMenu?.matches(":popover-open")) kategoriMenu.hidePopover();
		hoverPreviewed = false;
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key !== "Escape") return;
		if (searchOpen) toggleSearch();
		if (mobileMenuOpen) closeMobileMenu();
	}

	function handleWindowScroll() {
		if (kategoriOpen) kategoriMenu?.hidePopover();
	}
</script>

<svelte:window
	on:keydown={handleGlobalKeydown}
	on:scroll={handleWindowScroll}
	on:resize={() => kategoriOpen && positionKategoriMenu()}
/>

<header
	class="py-4 md:py-5 mb-3 md:mb-4 border-b border-gray-100 dark:border-gray-800 relative"
>
	<div class="mb-3 md:mb-4">
		<h1
			class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 font-heading"
		>
			<a
				href="/"
				class="hover:text-brand transition-colors"
				>shidiq</a
			>
		</h1>
		<p
			class="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium"
		>
			seseorang yang berusaha untuk hidup
		</p>
	</div>

	<nav aria-label="Navigasi utama">
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center justify-between">
			<div class="flex items-center gap-6">
				{#each links as link}
					{#if link.children}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="relative"
							on:pointerenter={openKategoriPreview}
							on:pointerleave={closeKategoriPreview}
							on:focusout={handleKategoriFocusOut}
						>
							<button
								bind:this={kategoriTrigger}
								id="kategori-trigger"
								type="button"
								popovertarget="kategori-menu"
								aria-controls="kategori-menu"
								aria-expanded={kategoriOpen}
								on:click={handleKategoriTriggerClick}
								class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
							>
								{link.label}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							<ul
								bind:this={kategoriMenu}
								id="kategori-menu"
								popover="auto"
								on:beforetoggle={handleKategoriBeforeToggle}
								on:toggle={handleKategoriToggle}
								class="kategori-menu fixed inset-auto z-50 m-0 w-48 list-none rounded-lg border border-gray-100 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900"
							>
								{#each link.children as child}
									<li>
										<a
											href={child.href}
											aria-current={isActive(child.href)
												? "page"
												: undefined}
											class="block rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white {isActive(
												child.href,
											)
												? 'font-medium text-gray-900 dark:text-white'
												: 'text-gray-500 dark:text-gray-400'}"
										>
											{child.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<a
							href={link.href}
							aria-current={isActive(link.href) ? "page" : undefined}
							class="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white
							{isActive(link.href)
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
					type="button"
					on:click={toggleSearch}
					aria-expanded={searchOpen}
					aria-controls="site-search"
					aria-label="Cari tulisan"
					class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
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
					type="button"
					on:click={toggleMobileMenu}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
					aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
					class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
				>
					{#if mobileMenuOpen}
						<!-- Close Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
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
							aria-hidden="true"
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
						type="button"
						on:click={toggleSearch}
						aria-expanded={searchOpen}
						aria-controls="site-search"
						aria-label="Cari tulisan"
						class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
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
					id="mobile-menu"
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
										aria-current={isActive(child.href)
											? "page"
											: undefined}
										class="block pl-6 pr-3 py-2 rounded-md text-base font-medium transition-colors
										{isActive(child.href)
											? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
											: 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'}"
									>
										{child.label}
									</a>
								{/each}
							</div>
						{:else}
							<a
								href={link.href}
								on:click={closeMobileMenu}
								aria-current={isActive(link.href) ? "page" : undefined}
								class="block px-3 py-2 rounded-md text-base font-medium transition-colors
								{isActive(link.href)
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
			type="button"
			class="fixed inset-0 z-40 bg-transparent cursor-default"
			on:click={toggleSearch}
			on:keydown={(e) => e.key === "Escape" && toggleSearch()}
			transition:fade={{ duration: 150 }}
			aria-label="Tutup pencarian"
			tabindex="-1"
		></button>
		<!-- Search Box -->
		<div
			id="site-search"
			role="search"
			aria-label="Pencarian situs"
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
					aria-hidden="true"
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
					type="search"
					enterkeyhint="search"
					autocomplete="off"
					aria-label="Cari tulisan"
					placeholder="Ketik dan tekan Enter..."
					class="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-400"
				/>
				<button
					type="button"
					on:click={toggleSearch}
					class="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
					aria-label="Tutup pencarian"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
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

<style>
	@supports (anchor-name: --kategori-trigger) {
		#kategori-trigger {
			anchor-name: --kategori-trigger;
		}

		.kategori-menu {
			inset-block-start: anchor(--kategori-trigger bottom);
			inset-inline-start: anchor(--kategori-trigger left);
			margin-block-start: 0.5rem;
		}
	}

	.kategori-menu {
		opacity: 0;
		translate: 0 -4px;
		transition-property: opacity, translate, display, overlay;
		transition-duration: 0.15s;
		transition-timing-function: ease-out;
		transition-behavior: allow-discrete;
	}

	.kategori-menu:popover-open {
		opacity: 1;
		translate: 0 0;
	}

	@starting-style {
		.kategori-menu:popover-open {
			opacity: 0;
			translate: 0 -4px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.kategori-menu {
			transition-duration: 0.1s;
		}
	}
</style>
