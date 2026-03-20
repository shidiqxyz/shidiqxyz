<script lang="ts">
    import { slide } from "svelte/transition";
    import { onMount, tick } from "svelte";
    import { afterNavigate } from "$app/navigation";

    export let title = "Daftar Isi";
    export let selector = "h2, h3";
    export let containerSelector = "article"; // Default container to scan headings from

    type HeadingData = {
        id: string;
        text: string;
        level: number;
        isOpen: boolean;
        children: { id: string; text: string; level: number }[];
    };
    let headings: HeadingData[] = [];
    let isOpen = true;

    function toggle() {
        isOpen = !isOpen;
    }

    function toggleNode(heading: HeadingData) {
        heading.isOpen = !heading.isOpen;
        headings = headings;
    }

    function scanHeadings() {
        const container = document.querySelector(containerSelector);
        if (container) {
            const elements = Array.from(
                container.querySelectorAll(selector),
            ) as HTMLElement[];
            
            let tempHeadings: HeadingData[] = [];
            let currentH2: HeadingData | null = null;

            elements.forEach((el) => {
                const level = parseInt(el.tagName.substring(1));
                if (level === 2) {
                    currentH2 = {
                        id: el.id,
                        text: el.innerText,
                        level,
                        isOpen: false,
                        children: []
                    };
                    tempHeadings.push(currentH2);
                } else if (level === 3) {
                    if (currentH2) {
                        currentH2.children.push({
                            id: el.id,
                            text: el.innerText,
                            level
                        });
                    } else {
                        tempHeadings.push({
                            id: el.id,
                            text: el.innerText,
                            level,
                            isOpen: false,
                            children: []
                        });
                    }
                }
            });
            headings = tempHeadings;
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
        class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
    >
        <div class="flex items-center gap-3">
            <div
                class="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
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
            <span class="font-bold text-gray-900 dark:text-gray-100 text-sm">
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
        <div transition:slide={{ duration: 300 }} class="px-4 pb-4 pt-0">
            <div class="h-px w-full bg-gray-200 dark:bg-gray-700/50 mb-3"></div>
            <ul class="flex flex-col gap-2">
                {#each headings as heading}
                    <li class="flex flex-col">
                        <div class="flex items-center">
                            {#if heading.children.length > 0}
                                <button
                                    on:click|preventDefault={() => toggleNode(heading)}
                                    aria-label={heading.isOpen ? `Tutup sub-menu ${heading.text}` : `Buka sub-menu ${heading.text}`}
                                    class="p-1 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-transform {heading.isOpen ? 'rotate-90' : ''}"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            {:else}
                                <div class="w-6 mr-1 flex-shrink-0"></div>
                            {/if}
                            <button
                                on:click|preventDefault={() => scrollTo(heading.id)}
                                class="flex-1 text-left py-1.5 pr-3 pl-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-start gap-2.5 group"
                            >
                                <span class="leading-relaxed">{heading.text}</span>
                            </button>
                        </div>

                        {#if heading.isOpen && heading.children.length > 0}
                            <ul transition:slide={{ duration: 200 }} class="flex flex-col gap-1 mt-1 pl-6 border-l w-full border-gray-200 dark:border-gray-700 ml-3.5">
                                {#each heading.children as child}
                                    <li class="relative">
                                        <div class="absolute w-2 h-px bg-gray-200 dark:bg-gray-700 left-0 top-1/2 -translate-y-1/2"></div>
                                        <button
                                            on:click|preventDefault={() => scrollTo(child.id)}
                                            class="w-full text-left py-1 pr-3 pl-4 rounded-lg text-[14px] text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                                        >
                                            <span class="leading-relaxed block">{child.text}</span>
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
