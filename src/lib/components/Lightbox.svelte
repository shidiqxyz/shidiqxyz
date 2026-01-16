<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    export let contentElement: HTMLElement | undefined = undefined;

    let isOpen = false;
    let currentImage: HTMLImageElement | null = null;
    let lightboxImage = "";
    let lightboxAlt = "";

    function openLightbox(img: HTMLImageElement) {
        currentImage = img;
        lightboxImage = img.src;
        lightboxAlt = img.alt || "";
        isOpen = true;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        isOpen = false;
        currentImage = null;
        lightboxImage = "";
        lightboxAlt = "";
        document.body.style.overflow = "";
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape" && isOpen) {
            closeLightbox();
        }
    }

    function handleImageClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === "IMG" && !target.closest("a")) {
            e.preventDefault();
            openLightbox(target as HTMLImageElement);
        }
    }

    onMount(() => {
        if (contentElement) {
            contentElement.addEventListener("click", handleImageClick);
        }
        window.addEventListener("keydown", handleKeydown);
    });

    onDestroy(() => {
        if (!browser) return;
        if (contentElement) {
            contentElement.removeEventListener("click", handleImageClick);
        }
        window.removeEventListener("keydown", handleKeydown);
        document.body.style.overflow = "";
    });
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="lightbox-overlay" on:click={closeLightbox}>
        <button class="lightbox-close" aria-label="Close lightbox">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-8 h-8"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <img
            src={lightboxImage}
            alt={lightboxAlt}
            class="lightbox-image"
            on:click|stopPropagation
        />
        {#if lightboxAlt}
            <p class="lightbox-caption">{lightboxAlt}</p>
        {/if}
    </div>
{/if}

<style>
    .lightbox-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        cursor: zoom-out;
        padding: 2rem;
        animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 10000;
    }

    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    .lightbox-image {
        max-width: 90vw;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        cursor: default;
        animation: zoomIn 0.2s ease-out;
    }

    @keyframes zoomIn {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .lightbox-caption {
        margin-top: 1rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.875rem;
        text-align: center;
        max-width: 80vw;
    }
</style>
