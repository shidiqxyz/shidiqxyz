<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	export let data;
</script>

<svelte:head>
	<title>Pemikiran - shidiq</title>
	<meta
		name="description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan, teknologi, dan pengembangan diri sebagai seorang pembelajar."
	/>

	<!-- Open Graph -->
	<meta property="og:site_name" content="shidiq" />
	<meta property="og:title" content="Pemikiran - shidiq" />
	<meta
		property="og:description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan, teknologi, dan pengembangan diri sebagai seorang pembelajar."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shidiq.xyz/pemikiran" />
	<meta property="og:image" content="https://shidiq.xyz/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Pemikiran - shidiq" />
	<meta
		name="twitter:description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan, teknologi, dan pengembangan diri sebagai seorang pembelajar."
	/>
	<meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />
</svelte:head>

<section class="space-y-12">
	<div class="space-y-4">
		<h1
			class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
		>
			Pemikiran
		</h1>
		<p class="text-gray-600 dark:text-gray-400 max-w-lg">
			Refleksi, opini, dan perenungan filosofis.
		</p>
	</div>

	<div class="space-y-10">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</section>
