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
    <div class="flex justify-center items-center gap-4 mt-12">
        <button
            class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={currentPage === 1}
            on:click={() => changePage(currentPage - 1)}
        >
            Previous
        </button>

        <span class="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
        </span>

        <button
            class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={currentPage === totalPages}
            on:click={() => changePage(currentPage + 1)}
        >
            Next
        </button>
    </div>
{/if}
