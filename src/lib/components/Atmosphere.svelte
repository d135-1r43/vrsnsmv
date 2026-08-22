<script lang="ts">
	import { onMount } from 'svelte';
	import { isCoarsePointer, prefersReducedMotion, seededRandom } from '$lib/utils/motion';

	// Seeded so the server and the client agree on where every ember sits.
	const random = seededRandom(0x5eed);
	const embers = Array.from({ length: 18 }, () => ({
		left: random() * 100,
		size: 1 + random() * 2.4,
		duration: 28 + random() * 34,
		delay: -random() * 60,
		drift: (random() - 0.5) * 140,
		opacity: 0.12 + random() * 0.3
	}));

	let layer: HTMLDivElement;
	let candleLit = $state(false);

	onMount(() => {
		if (prefersReducedMotion() || isCoarsePointer()) return;

		let frameId = 0;

		const handleMove = (event: PointerEvent) => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				layer.style.setProperty('--cursor-x', `${event.clientX}px`);
				layer.style.setProperty('--cursor-y', `${event.clientY}px`);
				candleLit = true;
			});
		};

		window.addEventListener('pointermove', handleMove, { passive: true });

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener('pointermove', handleMove);
		};
	});
</script>

<div bind:this={layer} class="atmosphere" aria-hidden="true">
	<!-- Incense smoke drifting across the page -->
	<div class="smoke smoke-a"></div>
	<div class="smoke smoke-b"></div>

	<!-- Embers rising through the dark -->
	<div class="embers">
		{#each embers as ember, index (index)}
			<span
				class="ember"
				style="
					left: {ember.left}%;
					width: {ember.size}px;
					height: {ember.size}px;
					--ember-drift: {ember.drift}px;
					--ember-opacity: {ember.opacity};
					animation-duration: {ember.duration}s;
					animation-delay: {ember.delay}s;
				"
			></span>
		{/each}
	</div>

	<!-- Candlelight carried by the cursor -->
	<div class="candle" class:lit={candleLit}></div>

	<!-- Film grain and vignette, closing the frame -->
	<div class="grain"></div>
	<div class="vignette"></div>
</div>

<style>
	.atmosphere {
		position: fixed;
		inset: 0;
		z-index: 60;
		pointer-events: none;
		overflow: hidden;
	}

	/* --- Incense smoke --------------------------------------------------- */

	.smoke {
		position: absolute;
		width: 70vmax;
		height: 70vmax;
		border-radius: 50%;
		filter: blur(60px);
		mix-blend-mode: screen;
		will-change: transform;
	}

	.smoke-a {
		top: -20vmax;
		left: -15vmax;
		background: radial-gradient(circle, rgba(255, 82, 82, 0.05), transparent 65%);
		animation: drift-a 64s ease-in-out infinite;
	}

	.smoke-b {
		right: -25vmax;
		bottom: -25vmax;
		background: radial-gradient(circle, rgba(140, 160, 200, 0.045), transparent 65%);
		animation: drift-b 88s ease-in-out infinite;
	}

	@keyframes drift-a {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(12vw, 8vh, 0) scale(1.18);
		}
	}

	@keyframes drift-b {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1.1);
		}
		50% {
			transform: translate3d(-14vw, -10vh, 0) scale(1);
		}
	}

	/* --- Rising embers --------------------------------------------------- */

	.embers {
		position: absolute;
		inset: 0;
	}

	.ember {
		position: absolute;
		bottom: -5vh;
		border-radius: 50%;
		background: #ff5252;
		box-shadow: 0 0 6px rgba(255, 82, 82, 0.7);
		opacity: 0;
		animation-name: ascend;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		will-change: transform, opacity;
	}

	@keyframes ascend {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0;
		}
		12% {
			opacity: var(--ember-opacity);
		}
		85% {
			opacity: var(--ember-opacity);
		}
		100% {
			transform: translate3d(var(--ember-drift), -110vh, 0);
			opacity: 0;
		}
	}

	/* --- Cursor candlelight ---------------------------------------------- */

	.candle {
		position: absolute;
		top: 0;
		left: 0;
		width: 44rem;
		height: 44rem;
		margin: -22rem 0 0 -22rem;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(255, 140, 100, 0.09),
			rgba(255, 82, 82, 0.035) 38%,
			transparent 68%
		);
		mix-blend-mode: screen;
		opacity: 0;
		transform: translate3d(var(--cursor-x, 50vw), var(--cursor-y, 50vh), 0);
		transition: opacity 900ms ease;
		will-change: transform;
	}

	.candle.lit {
		opacity: 1;
		animation: candle-flicker 4.5s ease-in-out infinite;
	}

	@keyframes candle-flicker {
		0%,
		100% {
			opacity: 1;
		}
		18% {
			opacity: 0.72;
		}
		34% {
			opacity: 0.94;
		}
		52% {
			opacity: 0.62;
		}
		71% {
			opacity: 0.88;
		}
	}

	/* --- Grain and vignette ---------------------------------------------- */

	.grain {
		position: absolute;
		inset: -100%;
		width: 300%;
		height: 300%;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
		animation: grain-shift 700ms steps(1) infinite;
	}

	@keyframes grain-shift {
		0% {
			transform: translate3d(0, 0, 0);
		}
		20% {
			transform: translate3d(-4%, 3%, 0);
		}
		40% {
			transform: translate3d(3%, -5%, 0);
		}
		60% {
			transform: translate3d(-5%, -2%, 0);
		}
		80% {
			transform: translate3d(4%, 4%, 0);
		}
	}

	.vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			transparent 42%,
			rgba(3, 5, 8, 0.42) 88%,
			rgba(3, 5, 8, 0.72) 100%
		);
	}

	@media (prefers-reduced-motion: reduce) {
		.smoke,
		.ember,
		.grain,
		.candle {
			animation: none;
		}

		.ember {
			display: none;
		}
	}
</style>
