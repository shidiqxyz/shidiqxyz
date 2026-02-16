<script lang="ts">
    import { slide } from "svelte/transition";
    import { onMount, tick } from "svelte";
    import { afterNavigate } from "$app/navigation";

    export let title = "Daftar Isi";
    export let selector = "h2, h3";
    export let containerSelector = "article"; // Default container to scan headings from

    let headings: { id: string; text: string; level: number }[] = [];
    let isOpen = true;

    function toggle() {
        isOpen = !isOpen;
    }

    function scanHeadings() {
        const container = document.querySelector(containerSelector);
        if (container) {
            const elements = Array.from(
                container.querySelectorAll(selector),
            ) as HTMLElement[];
            headings = elements.map((el) => ({
                id: el.id,
                text: el.innerText,
                level: parseInt(el.tagName.substring(1)),
            }));
        }
    }

    onMount(() => {
        scanHeadings();
    });

    // Re-scan headings after SvelteKit client-side navigation
    afterNavigate(async () => {
        await tick();
        setTimeout(() => {
            scanHeadings();
        }, 50);
    });

    function scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            history.pushState(null, "", `#${id}`);
        }
    }
</script>

<div
    class="not-prose inline-toc my-8 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300"
>
    <button
        on:click={toggle}
        class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
    >
        <div class="flex items-center gap-3">
            <div
                class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </div>
            <span class="font-bold text-gray-900 dark:text-gray-100 text-base">
                {title}
            </span>
        </div>

        <div
            class="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <span>{isOpen ? "Tutup" : "Buka"}</span>
            <div
                class="p-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-transform duration-300 {isOpen
                    ? 'rotate-180'
                    : ''}"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    </button>

    {#if isOpen && headings.length > 0}
        <div transition:slide={{ duration: 300 }} class="px-5 pb-6 pt-0">
            <div class="h-px w-full bg-gray-200 dark:bg-gray-700/50 mb-5"></div>
            <ul class="flex flex-col gap-3">
                {#each headings as heading}
                    <li>
                        <button
                            on:click|preventDefault={() => scrollTo(heading.id)}
                            class="w-full text-left py-2 pr-4 {heading.level ===
                            3
                                ? 'pl-12 border-l-2 border-gray-200 dark:border-gray-700 rounded-r-lg rounded-l-none'
                                : 'pl-4 rounded-lg'} text-base text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-start gap-3 group"
                        >
                            <span
                                class="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 transition-colors shrink-0"
                            ></span>
                            <span class="leading-relaxed">{heading.text}</span>
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
