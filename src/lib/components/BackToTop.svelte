<script lang="ts">
	import { onMount } from "svelte";

	let showButton = false;

	function scrollToTop() {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		window.scrollTo({
			top: 0,
			behavior: reduceMotion ? "auto" : "smooth",
		});
	}

	onMount(() => {
		// Prefer the CSS scroll-driven animation. Fall back to a passive scroll
		// listener only when the browser lacks it (or motion is reduced, which
		// disables the animation).
		const supportsScrollAnimation = CSS.supports(
			"animation-timeline",
			"scroll()",
		);
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (supportsScrollAnimation && !prefersReducedMotion) return;

		let ticking = false;
		const update = () => {
			ticking = false;
			showButton = window.scrollY > 500;
		};
		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		update();

		return () => window.removeEventListener("scroll", onScroll);
	});
</script>

<button
	type="button"
	on:click={scrollToTop}
	class="back-to-top fixed bottom-8 right-8 z-40 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
	class:is-visible={showButton}
	aria-label="Kembali ke atas"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M5 10l7-7m0 0l7 7m-7-7v18"
		/>
	</svg>
</button>

<style>
	.back-to-top {
		opacity: 0;
		visibility: hidden;
		translate: 0 12px;
		transition:
			opacity 0.2s ease,
			translate 0.2s ease,
			visibility 0.2s;
	}

	.back-to-top.is-visible {
		opacity: 1;
		visibility: visible;
		translate: 0 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			.back-to-top {
				animation: reveal-back-to-top linear both;
				animation-timeline: scroll(root block);
				animation-range: 400px 500px;
			}
		}
	}

	@keyframes reveal-back-to-top {
		from {
			opacity: 0;
			visibility: hidden;
			translate: 0 12px;
		}
		to {
			opacity: 1;
			visibility: visible;
			translate: 0 0;
		}
	}
</style>
