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
	import { page } from "$app/stores";
</script>

<svelte:head>
	<link rel="canonical" href={$page.url.origin + $page.url.pathname} />
</svelte:head>
<div class="min-h-screen px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl flex flex-col">
	<Navbar />
	<main class="flex-1 pb-10">
		<slot />
	</main>
	<Footer />
	<BackToTop />
</div>
