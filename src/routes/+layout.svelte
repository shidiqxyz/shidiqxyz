<script>
	import "../app.css";
	import "@fontsource/inter/400.css";
	import "@fontsource/inter/500.css";
	import "@fontsource/inter/600.css";
	import "@fontsource/inter/700.css";
	import "@fontsource/outfit/600.css";
	import "@fontsource/outfit/700.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import BackToTop from "$lib/components/BackToTop.svelte";
	import ConsentBanner from "$lib/components/ConsentBanner.svelte";
	import { page } from "$app/stores";
</script>

<svelte:head>
	<link rel="canonical" href={$page.url.origin + $page.url.pathname} />
</svelte:head>
<div class="min-h-screen px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl flex flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg dark:focus:bg-gray-800 dark:focus:text-gray-100"
	>
		Langsung ke konten
	</a>
	<Navbar />
	<main id="main-content" tabindex="-1" class="flex-1 pb-10">
		<slot />
	</main>
	<Footer />
	<BackToTop />
	<ConsentBanner />
</div>
