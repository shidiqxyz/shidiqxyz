<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
	import { getPosts } from "$lib/utils/posts";

	export let data;
</script>

<svelte:head>
	<title>shidiq</title>
	<meta name="description" content="Seseorang yang mencoba hidup." />
</svelte:head>

<section class="space-y-12">
	<div class="space-y-10">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</section>
