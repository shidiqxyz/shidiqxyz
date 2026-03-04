<script lang="ts">
	import BoxLink from "$lib/components/BoxLink.svelte";

	const boxes = [
		{
			title: "Proses",
			description:
				"Catatan rekam jejak, perjalanan, dan proses belajar sehari-hari.",
			href: "/proses",
		},
		{
			title: "Pemikiran",
			description: "Esai, opini, dan sudut pandang tentang berbagai hal.",
			href: "/pemikiran",
		},
		{
			title: "Projects",
			description:
				"Kumpulan portofolio, eksperimen, dan karya yang sedang atau telah dibangun.",
			href: "/projects",
		},
		{
			title: "Panduan",
			description:
				"Tutorial, langkah-langkah, dan dokumentasi teknis yang bermanfaat.",
			href: "/panduan",
		},
		{
			title: "About",
			description:
				"Tentang saya, latar belakang, dan hal-hal personal lainnya.",
			href: "/about",
		},
	];
</script>

<svelte:head>
	<title>shidiq</title>
	<meta name="description" content="Seseorang yang mencoba hidup." />

	<!-- Open Graph -->
	<meta property="og:site_name" content="shidiq" />
	<meta property="og:title" content="shidiq - Blog Pribadi" />
	<meta
		property="og:description"
		content="Seseorang yang mencoba hidup. Blog tentang pemikiran dan proses belajar."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shidiq.xyz" />
	<meta property="og:image" content="https://shidiq.xyz/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="shidiq - Blog Pribadi" />
	<meta
		name="twitter:description"
		content="Seseorang yang mencoba hidup. Blog tentang pemikiran dan proses belajar."
	/>
	<meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />
</svelte:head>

<section class="py-10">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each boxes as box}
			<BoxLink {box} />
		{/each}
	</div>
</section>
