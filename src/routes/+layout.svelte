<script>
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen px-6 mx-auto max-w-3xl flex flex-col">
	<Navbar />
	<main class="flex-1 pb-10">
		<slot />
	</main>
	<Footer />
</div>
