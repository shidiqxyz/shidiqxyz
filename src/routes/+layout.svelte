<script>
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl flex flex-col">
	<Navbar />
	<main class="flex-1 pb-10">
		<slot />
	</main>
	<Footer />
</div>
