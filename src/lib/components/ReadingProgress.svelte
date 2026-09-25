<script>
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    export let color = "#3b82f6"; // blue-500
    export let height = "4px";

    let progress = 0;
    let ticking = false;

    function updateProgress() {
        ticking = false;
        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
            progress = (window.scrollY / scrollHeight) * 100;
        } else {
            progress = 0;
        }
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateProgress);
        }
    }

    onMount(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        updateProgress();
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", onScroll);
        }
    });
</script>

<div
    class="fixed top-0 left-0 z-50 transition-all duration-100 ease-out"
    style="width: {progress}%; height: {height}; background-color: {color};"
></div>
