<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	export let data;
</script>

<svelte:head>
	<title>Proses - shidiq</title>
	<meta
		name="description"
		content="Catatan perjalanan, eksperimen, dan dokumentasi proses belajar di bidang teknologi, blockchain, dan pengembangan diri."
	/>

	<!-- Open Graph -->
	<meta property="og:site_name" content="shidiq" />
	<meta property="og:title" content="Proses - shidiq" />
	<meta
		property="og:description"
		content="Catatan perjalanan, eksperimen, dan dokumentasi proses belajar di bidang teknologi, blockchain, dan pengembangan diri."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shidiq.xyz/proses" />
	<meta property="og:image" content="https://shidiq.xyz/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Proses - shidiq" />
	<meta
		name="twitter:description"
		content="Catatan perjalanan, eksperimen, dan dokumentasi proses belajar di bidang teknologi, blockchain, dan pengembangan diri."
	/>
	<meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />
</svelte:head>

<section class="space-y-12">
	<div class="space-y-4">
		<h1
			class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
		>
			Proses
		</h1>
		<p class="text-gray-600 dark:text-gray-400 max-w-lg">
			Catatan perjalanan, eksperimen, dan dokumentasi belajar.
		</p>
	</div>

	<div class="space-y-10">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</section>
