<script lang="ts">
    import PostCard from "$lib/components/PostCard.svelte";
    import { page } from "$app/stores";
    export let data;

    let searchTerm = "";

    $: searchTerm = $page.url.searchParams.get("q") || "";

    $: filteredPosts = data.posts.filter((post) => {
        const term = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(term) ||
            post.description.toLowerCase().includes(term) ||
            (post.tags &&
                post.tags.some((tag) => tag.toLowerCase().includes(term))) ||
            (post.content && post.content.toLowerCase().includes(term)) ||
            post.date.includes(term)
        );
    });
</script>

<svelte:head>
    <title>Pencarian - shidiq</title>
    <meta name="description" content="Cari tulisan di blog shidiq" />
</svelte:head>

<div class="space-y-8">
    <div class="relative">
        <input
            type="text"
            bind:value={searchTerm}
            placeholder="Cari judul, isi, tanggal, atau tag..."
            class="w-full px-5 py-4 pl-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 absolute left-4 top-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
    </div>

    <div class="space-y-8">
        {#if filteredPosts.length > 0}
            <div class="grid gap-8">
                {#each filteredPosts as post (post.slug)}
                    <PostCard {post} />
                {/each}
            </div>
        {:else}
            <div class="text-center py-20">
                <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1"
                >
                    Tidak ditemukan
                </h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Maaf, tidak ada tulisan yang cocok dengan "{searchTerm}"
                </p>
            </div>
        {/if}
    </div>
</div>
