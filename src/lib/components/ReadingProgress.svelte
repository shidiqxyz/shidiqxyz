<script lang="ts">
	import { onMount } from "svelte";

	export let color = "#3b82f6"; // blue-500
	export let height = "4px";

	let bar: HTMLDivElement;

	onMount(() => {
		// Native scroll-driven animation handles this in modern browsers. The
		// listener is only a fallback for engines without `scroll()` support,
		// and for reduced-motion users, whose animation is disabled.
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
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
			bar.style.transform = `scaleX(${progress})`;
		};

		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", update);
		update();

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", update);
		};
	});
</script>

<div
	bind:this={bar}
	class="reading-progress"
	style="--progress-color: {color}; --progress-height: {height};"
	aria-hidden="true"
></div>

<style>
	.reading-progress {
		position: fixed;
		inset-block-start: 0;
		inset-inline: 0;
		z-index: 50;
		block-size: var(--progress-height, 4px);
		background-color: var(--progress-color, #3b82f6);
		transform: scaleX(0);
		transform-origin: 0 50%;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			.reading-progress {
				animation: grow-progress auto linear both;
				animation-timeline: scroll(root block);
			}
		}
	}

	@keyframes grow-progress {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
</style>
