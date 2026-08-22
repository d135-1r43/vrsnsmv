<script lang="ts">
	import { onMount } from 'svelte';
	import { magnetic } from '$lib/actions/magnetic';
	import Sigil from './Sigil.svelte';

	const RADIUS = 26;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	let visible = $state(false);
	let progress = $state(0);

	const dashOffset = $derived(CIRCUMFERENCE * (1 - progress));

	onMount(() => {
		const handleScroll = () => {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			visible = window.scrollY > 500;
			progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	class="ascend {visible ? 'is-visible' : ''}"
	use:magnetic={{ strength: 0.3, max: 9 }}
	onclick={scrollToTop}
	aria-label="Scroll to top"
	aria-hidden={!visible}
	tabindex={visible ? 0 : -1}
>
	<!-- Ring charting how deep into the dark you have gone -->
	<svg class="ring" viewBox="0 0 60 60" aria-hidden="true">
		<circle class="ring-track" cx="30" cy="30" r={RADIUS} />
		<circle
			class="ring-progress"
			cx="30"
			cy="30"
			r={RADIUS}
			stroke-dasharray={CIRCUMFERENCE}
			stroke-dashoffset={dashOffset}
		/>
	</svg>

	<Sigil class="mark h-5 w-5 text-primary" />
</button>

<style>
	.ascend {
		position: fixed;
		right: 2.5rem;
		bottom: 3rem;
		z-index: 50;
		display: grid;
		place-items: center;
		width: 3.75rem;
		height: 3.75rem;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: rgba(9, 13, 17, 0.72);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		cursor: pointer;
		opacity: 0;
		transform: translate3d(var(--pull-x, 0), var(--pull-y, 0), 0) scale(0.7);
		pointer-events: none;
		transition:
			opacity 0.6s ease,
			transform 0.6s var(--ease-ritual),
			box-shadow 0.6s ease;
	}

	.ascend.is-visible {
		opacity: 1;
		transform: translate3d(var(--pull-x, 0), var(--pull-y, 0), 0) scale(1);
		pointer-events: auto;
	}

	.ascend:hover,
	.ascend:focus-visible {
		box-shadow: 0 0 34px rgba(255, 82, 82, 0.35);
	}

	.ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		fill: none;
	}

	.ring-track {
		stroke: rgba(255, 255, 255, 0.1);
		stroke-width: 1.5;
	}

	.ring-progress {
		stroke: var(--color-ember);
		stroke-width: 1.5;
		stroke-linecap: round;
		filter: drop-shadow(0 0 6px rgba(255, 82, 82, 0.7));
		transition: stroke-dashoffset 0.2s linear;
	}

	.ascend :global(.mark) {
		transition:
			transform 0.8s var(--ease-ritual),
			filter 0.6s ease;
	}

	.ascend:hover :global(.mark),
	.ascend:focus-visible :global(.mark) {
		transform: rotate(180deg) scale(1.12);
		filter: drop-shadow(0 0 12px rgba(255, 82, 82, 0.9));
	}

	@media (prefers-reduced-motion: reduce) {
		.ascend,
		.ring-progress,
		.ascend :global(.mark) {
			transition: none;
		}

		.ascend:hover :global(.mark) {
			transform: none;
		}
	}
</style>
