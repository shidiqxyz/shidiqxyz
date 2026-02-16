<script lang="ts">
    import { onMount, onDestroy, tick } from "svelte";
    import { afterNavigate } from "$app/navigation";

    export let contentElement: HTMLElement;

    let headings: { id: string; text: string; level: number }[] = [];
    let activeId = "";
    let observer: IntersectionObserver;

    function updateHeadings() {
        if (!contentElement) return;

        // Disconnect observer from old headings
        if (observer) observer.disconnect();

        const elements = Array.from(
            contentElement.querySelectorAll("h2, h3"),
        ) as HTMLElement[];

        headings = elements.map((el) => ({
            id: el.id,
            text: el.innerText,
            level: parseInt(el.tagName.substring(1)),
        }));

        // Re-observe the new headings
        if (observer) {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.observe(element);
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
    <nav class="toc text-sm">
        <h4
            class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4"
        >
            On this page
        </h4>
        <ul class="space-y-2 border-l border-gray-200 dark:border-gray-800">
            {#each headings as heading}
                <li>
                    <button
                        on:click|preventDefault={() =>
                            scrollToHeading(heading.id)}
                        class="block text-left w-full pl-4 py-1 border-l-2 -ml-[1px] transition-colors duration-200
                        {activeId === heading.id
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'}
                        {heading.level === 3 ? 'ml-4' : ''}"
                    >
                        {heading.text}
                    </button>
                </li>
            {/each}
        </ul>
    </nav>
{/if}
