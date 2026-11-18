<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	export let contentElement: HTMLElement | undefined = undefined;

	let dialogElement: HTMLDialogElement;
	let lightboxImage = "";
	let lightboxAlt = "";
	let enhancedImages: HTMLImageElement[] = [];

	function openLightbox(img: HTMLImageElement) {
		lightboxImage = img.currentSrc || img.src;
		lightboxAlt = img.alt || "";
		if (!dialogElement.open) dialogElement.showModal();
	}

	function handleDialogClick(event: MouseEvent) {
		// A click on the dialog's own padding (or on ::backdrop in browsers
		// without closedby) should dismiss it. Clicks on the image or caption
		// keep it open.
		if (event.target === dialogElement) dialogElement.close();
	}

	function handleImageClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.tagName === "IMG" && !target.closest("a")) {
			event.preventDefault();
			openLightbox(target as HTMLImageElement);
		}
	}

	function handleImageKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		if (
			target.tagName === "IMG" &&
			!target.closest("a") &&
			(event.key === "Enter" || event.key === " ")
		) {
			event.preventDefault();
			openLightbox(target as HTMLImageElement);
		}
	}

	function enhanceImages(root: HTMLElement) {
		root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
			if (img.closest("a") || img.dataset.lightboxReady) return;

			img.dataset.lightboxReady = "true";
			img.tabIndex = 0;
			img.setAttribute("role", "button");
			img.setAttribute("aria-haspopup", "dialog");
			if (!img.hasAttribute("aria-label")) {
				img.setAttribute(
					"aria-label",
					img.alt ? `Perbesar gambar: ${img.alt}` : "Perbesar gambar",
				);
			}
			enhancedImages.push(img);
		});
	}

	function cleanupImages(root: HTMLElement | null) {
		if (!root) return;
		root.removeEventListener("click", handleImageClick);
		root.removeEventListener("keydown", handleImageKeydown);

		enhancedImages.forEach((img) => {
			delete img.dataset.lightboxReady;
			img.removeAttribute("tabindex");
			img.removeAttribute("role");
			img.removeAttribute("aria-haspopup");
			img.removeAttribute("aria-label");
		});
		enhancedImages = [];
	}

	let attachedTo: HTMLElement | null = null;

	// Re-attach when contentElement arrives late (article bind:this resolves
	// after Lightbox mounts) and detach from the old element.
	$: if (contentElement && contentElement !== attachedTo) {
		cleanupImages(attachedTo);
		attachedTo = contentElement;
		contentElement.addEventListener("click", handleImageClick);
		contentElement.addEventListener("keydown", handleImageKeydown);
		enhanceImages(contentElement);
	}

	onMount(() => {
		// Nothing to do here yet, but keep the lifecycle hook so the dialog is
		// definitely in the document before showModal() can be called.
	});

	onDestroy(() => {
		cleanupImages(attachedTo);
		attachedTo = null;
	});
</script>

<dialog
	bind:this={dialogElement}
	class="lightbox"
	closedby="any"
	aria-label={lightboxAlt
		? `Pratinjau gambar: ${lightboxAlt}`
		: "Pratinjau gambar"}
	on:click={handleDialogClick}
>
	<button type="button" class="lightbox-close" aria-label="Tutup pratinjau" autofocus>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="w-8 h-8"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</button>
	{#if lightboxImage}
		<img
			src={lightboxImage}
			alt={lightboxAlt}
			class="lightbox-image"
			decoding="async"
		/>
	{/if}
	{#if lightboxAlt}
		<p class="lightbox-caption">{lightboxAlt}</p>
	{/if}
</dialog>

<style>
	.lightbox {
		position: fixed;
		inset: 0;
		width: 100%;
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0;
		padding: 2rem;
		border: 0;
		background: transparent;
		overflow: auto;
		overscroll-behavior: contain;
		opacity: 0;
		transition-property: opacity, display, overlay;
		transition-duration: 0.2s;
		transition-timing-function: ease-out;
		transition-behavior: allow-discrete;
	}

	.lightbox[open] {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 1;
	}

	@media (prefers-reduced-motion: no-preference) {
		.lightbox {
			transform: scale(0.96);
			transition-property: opacity, transform, display, overlay;
		}

		.lightbox[open] {
			transform: scale(1);
		}

		@starting-style {
			.lightbox[open] {
				opacity: 0;
				transform: scale(0.96);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lightbox,
		.lightbox::backdrop {
			transition-duration: 0.1s;
		}
	}

	.lightbox::backdrop {
		overflow: hidden;
		overscroll-behavior: contain;
		background-color: rgb(0 0 0 / 0);
		backdrop-filter: blur(0);
		transition-property: background-color, backdrop-filter, display, overlay;
		transition-duration: 0.2s;
		transition-timing-function: ease-out;
		transition-behavior: allow-discrete;
	}

	.lightbox[open]::backdrop {
		background-color: rgb(0 0 0 / 0.7);
		backdrop-filter: blur(4px);
	}

	@starting-style {
		.lightbox[open]::backdrop {
			background-color: rgb(0 0 0 / 0);
			backdrop-filter: blur(0);
		}
	}

	.lightbox-close {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		color: white;
		background: rgb(255 255 255 / 0.1);
		border: none;
		border-radius: 50%;
		padding: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s ease, transform 0.2s ease;
		z-index: 1;
	}

	.lightbox-close:hover {
		background: rgb(255 255 255 / 0.2);
	}

	@media (prefers-reduced-motion: no-preference) {
		.lightbox-close:hover {
			transform: scale(1.1);
		}
	}

	.lightbox-image {
		max-width: 90vw;
		max-height: 85vh;
		object-fit: contain;
		border-radius: 8px;
		box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
		cursor: default;
	}

	.lightbox-caption {
		margin-top: 1rem;
		color: rgb(255 255 255 / 0.8);
		font-size: 0.875rem;
		text-align: center;
		max-width: 80vw;
	}
</style>
