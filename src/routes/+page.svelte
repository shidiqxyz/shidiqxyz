<script lang="ts">
	import BoxLink from "$lib/components/BoxLink.svelte";

	const boxes = [
		{
			title: "Proses",
			description: "Catatan perjalanan belajar.",
			href: "/proses",
		},
		{
			title: "Pemikiran",
			description: "Kumpulan tulisan acak.",
			href: "/pemikiran",
		},
		{
			title: "Projects",
			description: "Kumpulan portofolio yang tidak bagus-bagus amat.",
			href: "/projects",
		},
		{
			title: "Panduan",
			description: "Cara menggunakan blog ini.",
			href: "/panduan",
		},
		{
			title: "About",
			description: "Tentang saya.",
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

<section class="pb-10 pt-4">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each boxes as box}
			<div
				class={box.title === "Proses"
					? "md:col-span-2 lg:col-span-2"
					: "md:col-span-1"}
			>
				<BoxLink {box} />
			</div>
		{/each}
	</div>
</section>
