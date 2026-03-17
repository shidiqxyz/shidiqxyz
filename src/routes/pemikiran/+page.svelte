<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	import Pagination from "$lib/components/Pagination.svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	export let data;

	const itemsPerPage = 5;

	$: currentPage = Number($page.url.searchParams.get("page")) || 1;
	$: totalPages = Math.ceil(data.posts.length / itemsPerPage);
	$: paginatedPosts = data.posts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	function handlePageChange(event: CustomEvent) {
		const newPage = event.detail.page;
		const url = new URL($page.url);
		url.searchParams.set("page", String(newPage));
		goto(url.toString());
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<svelte:head>
	<title>Pemikiran | shidiq</title>
	<meta
		name="description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan dan teknologi."
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Pemikiran | shidiq" />
	<meta
		property="og:description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan dan teknologi."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shidiq.xyz/pemikiran" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Pemikiran | shidiq" />
	<meta
		name="twitter:description"
		content="Refleksi, opini, dan perenungan filosofis tentang kehidupan dan teknologi."
	/>
</svelte:head>

<section class="space-y-8">
	<div class="space-y-2">
		<h1
			class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
		>
			Pemikiran
		</h1>
		<p class="text-gray-600 dark:text-gray-400 max-w-lg">
			Kumpulan tulisan acak.
		</p>
	</div>

	<div class="space-y-4">
		{#each paginatedPosts as post}
			<PostCard {post} />
		{/each}
	</div>

	<Pagination {currentPage} {totalPages} on:change={handlePageChange} />
</section>
