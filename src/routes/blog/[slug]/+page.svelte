<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - shidiq</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="prose prose-lg dark:prose-invert max-w-none">
	<div class="mb-8 not-prose">
		<div
			class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4"
		>
			<time datetime={data.meta.date}>
				{new Date(data.meta.date).toLocaleDateString("id-ID", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			<span>•</span>
			<span class="capitalize text-blue-600 dark:text-blue-400"
				>{data.meta.category}</span
			>
		</div>
		<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
			{data.meta.title}
		</h1>
		<div class="flex gap-2">
			{#each data.meta.tags as tag}
				<span
					class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300"
				>
					#{tag}
				</span>
			{/each}
		</div>
	</div>

	<svelte:component this={data.content} />
</article>
