<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let chart = "";

    let container: HTMLDivElement;
    let rendered = false;
    let isZoomed = false;
    let svgContent = "";

    function toggleZoom() {
        isZoomed = !isZoomed;
        if (isZoomed) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape" && isZoomed) {
            toggleZoom();
        }
    }

    onMount(async () => {
        if (browser && chart) {
            const mermaid = (await import("mermaid")).default;
            mermaid.initialize({
                startOnLoad: false,
                theme: "default",
                securityLevel: "loose",
            });

            try {
                const { svg } = await mermaid.render(
                    "mermaid-" + Math.random().toString(36).slice(2),
                    chart,
                );
                svgContent = svg;
                container.innerHTML = svg;
                rendered = true;
            } catch (e) {
                console.error("Mermaid render error:", e);
                container.innerHTML =
                    '<pre style="color: red;">Error rendering diagram</pre>';
            }
        }
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    bind:this={container}
    class="mermaid-container"
    on:click={rendered ? toggleZoom : undefined}
    title={rendered ? "Klik untuk zoom" : ""}
>
    {#if !rendered}
        <div class="mermaid-loading">Loading diagram...</div>
    {/if}
</div>

{#if isZoomed}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="mermaid-lightbox" on:click={toggleZoom}>
        <button class="lightbox-close" aria-label="Close">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <div class="lightbox-content">
            {@html svgContent}
        </div>
        <p class="lightbox-hint">
            Klik di mana saja atau tekan Escape untuk menutup
        </p>
    </div>
{/if}

<style>
    .mermaid-container {
        display: flex;
        justify-content: center;
        margin: 1.5rem 0;
        cursor: zoom-in;
        transition: transform 0.2s ease;
    }

    .mermaid-container:hover {
        transform: scale(1.01);
    }

    .mermaid-loading {
        color: var(--text-muted, #666);
        font-style: italic;
        cursor: default;
    }

    .mermaid-container :global(svg) {
        max-width: 100%;
        height: auto;
    }

    .mermaid-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: zoom-out;
        padding: 2rem;
        box-sizing: border-box;
    }

    .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background 0.2s;
    }

    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .lightbox-content {
        width: 95vw;
        height: 85vh;
        overflow: auto;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lightbox-content :global(svg) {
        width: 100%;
        height: 100%;
        max-width: none;
    }

    .lightbox-hint {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.875rem;
        margin-top: 1rem;
    }
</style>
