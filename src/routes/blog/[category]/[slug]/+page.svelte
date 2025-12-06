<script lang="ts">
    import { onMount } from "svelte";
    import TableOfContents from "$lib/components/TableOfContents.svelte";

    export let data;

    let readingTime = 0;
    let articleElement: HTMLElement;

    onMount(() => {
        if (articleElement) {
            const text =
                articleElement.innerText || articleElement.textContent || "";
            const wordCount = text.trim().split(/\s+/).length;
            readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        }
    });
</script>

<svelte:head>
    <title>{data.meta.title} - shidiq</title>
    <meta name="description" content={data.meta.description} />

    <!-- Open Graph -->
    <meta property="og:site_name" content="shidiq" />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
    <meta property="og:type" content="article" />
    <meta
        property="og:url"
        content="https://shidiq.xyz/blog/{data.meta.category}/{data.meta.slug ||
            ''}"
    />
    <meta property="og:image" content="https://shidiq.xyz/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.meta.title} />
    <meta name="twitter:description" content={data.meta.description} />
    <meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />

    <!-- Article metadata -->
    <meta property="article:published_time" content={data.meta.date} />
    <meta property="article:author" content="shidiq" />
    {#if data.meta.tags && data.meta.tags.length > 0}
        {#each data.meta.tags as tag}
            <meta property="article:tag" content={tag} />
        {/each}
    {/if}

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
		{@html JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: data.meta.title,
			image: ['https://shidiq.xyz/og-image.png'],
			datePublished: data.meta.date,
			dateModified: data.meta.date,
			author: [
				{
					'@type': 'Person',
					name: 'shidiq',
					url: 'https://shidiq.xyz/about'
				}
			],
			description: data.meta.description
		}).replace(/</g, '\\u003c')}
    </script>
</svelte:head>

<div class="relative">
    <!-- Desktop TOC (Right Side, Relative to Article) -->
    <aside class="hidden xl:block absolute left-full top-0 h-full ml-8 w-56">
        <div class="sticky top-24">
            <TableOfContents contentElement={articleElement} />
        </div>
    </aside>

    <article
        bind:this={articleElement}
        class="prose prose-lg dark:prose-invert max-w-none"
    >
        <div class="mb-8 not-prose">
            <div
                class="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-3 text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
                <div class="flex items-center gap-2">
                    <time datetime={data.meta.date}>
                        {new Date(data.meta.date).toLocaleString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <span>•</span>
                    <time datetime={data.meta.date}>
                        {new Date(data.meta.date).toLocaleString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </time>
                </div>

                <span class="hidden sm:inline">•</span>

                <div class="flex items-center gap-2">
                    <span class="capitalize text-blue-600 dark:text-blue-400"
                        >{data.meta.category}</span
                    >
                    {#if readingTime > 0}
                        <span>•</span>
                        <span>{readingTime} menit baca</span>
                    {/if}
                </div>
            </div>
            <h1
                class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
                {data.meta.title}
            </h1>
            <div class="flex flex-wrap gap-2">
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
</div>
