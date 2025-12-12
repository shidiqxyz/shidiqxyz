<script>
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    let showButton = false;

    function handleScroll() {
        if (window.scrollY > 500) {
            showButton = true;
        } else {
            showButton = false;
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", handleScroll);
        }
    });
</script>

{#if showButton}
    <button
        on:click={scrollToTop}
        transition:fade={{ duration: 200 }}
        class="fixed bottom-8 right-8 z-40 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Back to top"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
        </svg>
    </button>
{/if}
