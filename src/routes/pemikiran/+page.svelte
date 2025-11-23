<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	export let data;
</script>

<svelte:head>
	<title>Pemikiran - shidiq</title>
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
