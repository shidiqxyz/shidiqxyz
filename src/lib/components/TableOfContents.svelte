<script lang="ts">
    import { onMount, onDestroy, tick } from "svelte";
    import { slide } from "svelte/transition";
    import { afterNavigate } from "$app/navigation";

    export let contentElement: HTMLElement;

    type HeadingData = {
        id: string;
        text: string;
        level: number;
        isOpen: boolean;
        children: { id: string; text: string; level: number }[];
    };
    let headings: HeadingData[] = [];
    let activeId = "";
    let observer: IntersectionObserver;

    function toggleNode(heading: HeadingData) {
        heading.isOpen = !heading.isOpen;
        headings = headings;
    }

    function updateHeadings() {
        if (!contentElement) return;

        // Disconnect observer from old headings
        if (observer) observer.disconnect();

        const elements = Array.from(
            contentElement.querySelectorAll("h2, h3"),
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
                    children: [],
                };
                tempHeadings.push(currentH2);
            } else if (level === 3) {
                if (currentH2) {
                    currentH2.children.push({
                        id: el.id,
                        text: el.innerText,
                        level,
                    });
                } else {
                    tempHeadings.push({
                        id: el.id,
                        text: el.innerText,
                        level,
                        isOpen: false,
                        children: [],
                    });
                }
            }
        });
        headings = tempHeadings;

        // Re-observe the new headings
        if (observer) {
            elements.forEach((el) => {
                observer.observe(el);
            });
        }

        // Reset active heading
        activeId = "";
    }

    $: if (contentElement) {
        updateHeadings();
    }

    // Re-scan headings after SvelteKit client-side navigation
    afterNavigate(async () => {
        await tick();
        // Small delay to ensure mdsvex content has rendered
        setTimeout(() => {
            updateHeadings();
        }, 50);
    });

    function scrollToHeading(id: string) {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80; // Offset for sticky header if any
            const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            // Update activeId immediately for better UX
            activeId = id;
            // Update URL hash without scrolling
            history.pushState(null, "", `#${id}`);
        }
    }

    onMount(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeId = entry.target.id;
                }
            });
        };

        const options = {
            rootMargin: "-100px 0px -60% 0px",
            threshold: 0.1,
        };

        observer = new IntersectionObserver(callback, options);

        // Initial observation
        updateHeadings();
    });

    onDestroy(() => {
        if (observer) observer.disconnect();
    });
</script>

{#if headings.length > 0}
    <nav class="toc">
        <h4
            class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4"
        >
            On this page
        </h4>
        <ul
            class="space-y-1 block border-l border-gray-200 dark:border-gray-800"
        >
            {#each headings as heading}
                <li>
                    <div class="flex items-center group relative">
                        <!-- Active Border Indicator for H2 -->
                        <div
                            class="absolute left-[-1px] top-0 bottom-0 w-[2px]
                            {activeId === heading.id ||
                            (heading.children.some((c) => c.id === activeId) &&
                                !heading.isOpen)
                                ? 'bg-blue-600 dark:bg-blue-400'
                                : 'bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-700'} transition-colors duration-200"
                        ></div>

                        <button
                            on:click|preventDefault={() =>
                                scrollToHeading(heading.id)}
                            class="flex-1 text-left pl-3 py-1.5 transition-colors duration-200 text-sm
                            {activeId === heading.id ||
                            (heading.children.some((c) => c.id === activeId) &&
                                !heading.isOpen)
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}"
                        >
                            {heading.text}
                        </button>

                        {#if heading.children.length > 0}
                            <button
                                on:click|preventDefault={() =>
                                    toggleNode(heading)}
                                aria-label={heading.isOpen
                                    ? `Tutup sub-menu ${heading.text}`
                                    : `Buka sub-menu ${heading.text}`}
                                class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-transform {heading.isOpen
                                    ? 'rotate-90'
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
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        {/if}
                    </div>

                    {#if heading.isOpen && heading.children.length > 0}
                        <ul
                            class="mt-1 space-y-1 block"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each heading.children as child}
                                <li class="relative group block">
                                    <!-- Active Border Indicator for H3 -->
                                    <div
                                        class="absolute left-[-1px] top-0 bottom-0 w-[2px]
                                        {activeId === child.id
                                            ? 'bg-blue-600 dark:bg-blue-400'
                                            : 'bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-700'} transition-colors duration-200"
                                    ></div>
                                    <button
                                        on:click|preventDefault={() =>
                                            scrollToHeading(child.id)}
                                        class="block text-left w-full pl-6 pr-2 py-1 transition-colors duration-200 text-[13px]
                                        {activeId === child.id
                                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}"
                                    >
                                        {child.text}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
{/if}
