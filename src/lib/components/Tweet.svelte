<script lang="ts" context="module">
    // Singleton loader: widgets.js injected at most once per page
    let widgetsPromise: Promise<void> | null = null;

    function loadWidgets(): Promise<void> {
        if (typeof window === "undefined") return Promise.resolve();
        if ((window as any).twttr?.widgets) return Promise.resolve();
        if (!widgetsPromise) {
            widgetsPromise = new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                script.charset = "utf-8";
                script.onload = () => resolve();
                script.onerror = () => resolve();
                document.body.appendChild(script);
            });
        }
        return widgetsPromise;
    }
</script>

<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    export let tweetLink: string = "";
    export let theme: "light" | "dark" = "light";

    let container: HTMLElement;
    let observer: IntersectionObserver | null = null;
    let loaded = false;

    // Normalize x.com to twitter.com for the widget
    $: finalLink = tweetLink.replace("x.com", "twitter.com");

    async function render() {
        if (loaded || !container) return;
        loaded = true;
        await loadWidgets();
        (window as any).twttr?.widgets?.load(container);
    }

    onMount(() => {
        if (!container) return;
        if ("IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            render();
                            observer?.disconnect();
                            observer = null;
                            break;
                        }
                    }
                },
                { rootMargin: "300px" },
            );
            observer.observe(container);
        } else {
            render();
        }
    });

    onDestroy(() => {
        observer?.disconnect();
        observer = null;
    });
</script>

<div
    class="tweet-container my-8 w-full flex justify-center"
    bind:this={container}
>
    <blockquote
        class="twitter-tweet"
        data-theme={theme}
        data-dnt="true"
        data-align="center"
    >
        <a href={finalLink} aria-label="View Tweet on Twitter"></a>
    </blockquote>
</div>

<style>
    /* Optional: Ensure it doesn't overflow */
    :global(.twitter-tweet) {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        width: 100% !important;
    }
</style>
