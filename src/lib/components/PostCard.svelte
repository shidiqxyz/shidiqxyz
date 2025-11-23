<script lang="ts">
	export let post: {
		title: string;
		date: string;
		description: string;
		slug: string;
		category: string;
	};

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="group">
	<a href="/blog/{post.slug}" class="block space-y-3">
		<div class="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span>•</span>
			<span class="capitalize text-blue-600 dark:text-blue-400">{post.category}</span>
		</div>
		<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
			{post.title}
		</h2>
		<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
			{post.description}
		</p>
	</a>
</article>
