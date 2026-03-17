<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let currentPage: number;
    export let totalPages: number;

    const dispatch = createEventDispatcher();

    function changePage(page: number) {
        if (page >= 1 && page <= totalPages) {
            dispatch("change", { page });
        }
    }
</script>

{#if totalPages > 1}
    <div class="flex justify-center items-center gap-4 mt-8">
        <button
            class="group flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={currentPage === 1}
            on:click={() => changePage(currentPage - 1)}
            aria-label="Halaman sebelumnya"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="hidden sm:inline">Sebelumnya</span>
        </button>

        <span class="text-sm font-medium text-gray-600 dark:text-gray-400 tabular-nums">
            {currentPage} <span class="text-gray-400 dark:text-gray-600">/</span> {totalPages}
        </span>

        <button
            class="group flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={currentPage === totalPages}
            on:click={() => changePage(currentPage + 1)}
            aria-label="Halaman berikutnya"
        >
            <span class="hidden sm:inline">Berikutnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
{/if}
