<script>
    import { fade } from "svelte/transition";
    export let text = "";

    let items = ["Copy"];
    let state = "idle"; // idle, copied

    async function copy() {
        try {
            await navigator.clipboard.writeText(text);
            state = "copied";
            setTimeout(() => {
                state = "idle";
            }, 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    }
</script>

<button
    on:click={copy}
    class="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-transparent hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
    aria-label="Copy code"
>
    {#if state === "copied"}
        <div
            in:fade={{ duration: 100 }}
            class="flex items-center gap-1 text-xs font-mono text-green-400"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <span>Copied!</span>
        </div>
    {:else}
        <div in:fade={{ duration: 100 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
            </svg>
        </div>
    {/if}
</button>
