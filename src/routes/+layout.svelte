<script>
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import BackToTop from "$lib/components/BackToTop.svelte";
	import { page } from "$app/stores";
</script>

<svelte:head>
	<link rel="canonical" href={$page.url.href} />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
		integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
		crossorigin="anonymous"
	/>
</svelte:head>
<div class="min-h-screen px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl flex flex-col">
	<Navbar />
	<main class="flex-1 pb-10">
		<slot />
	</main>
	<Footer />
	<BackToTop />
</div>
