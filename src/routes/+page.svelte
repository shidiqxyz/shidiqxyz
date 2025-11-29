<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	import { getPosts } from "$lib/utils/posts";

	export let data;
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

<section class="space-y-12">
	<div class="space-y-6">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</section>
