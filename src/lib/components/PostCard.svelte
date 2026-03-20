<script lang="ts">
	export let post: {
		title: string;
		date: string;
		description: string;
		slug: string;
		category: string;
	};

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}
</script>

<article class="group relative flex flex-col space-y-1.5 p-4 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
	<div
		class="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400"
	>
		<time datetime={post.date}>{formatDate(post.date)}</time>
		<span>•</span>
		<span class="capitalize text-brand"
			>{post.category}</span
		>
	</div>
	
	<h2
		class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors"
	>
		<a href="/blog/{post.category}/{post.slug}" class="after:absolute after:inset-0 after:z-10 focus:outline-none">
			{post.title}
		</a>
	</h2>
	
	<p class="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
		{post.description}
	</p>
</article>
