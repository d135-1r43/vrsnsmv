<script lang="ts">
	import { SIGIL_PATH, SIGIL_VIEWBOX } from './sigil-path';

	/**
	 * A generated backdrop: a rose window of sacred geometry in the dark.
	 *
	 * Everything here is computed — no bitmap. The mandala is built from the
	 * band's own cross, repeated around rings of the seed of life, so what sits
	 * behind the words is made of the same mark as the rest of the site.
	 *
	 * It is deliberately still. An earlier pass turned the rings against each
	 * other and laid a turbulence veil over the whole section; both re-rasterise
	 * a large surface every frame and wedged the renderer on a high-density
	 * display. The page-wide Atmosphere already supplies the motion, so this
	 * layer rasterises once and then costs nothing.
	 */

	const TAU = Math.PI * 2;

	/** Places `count` points evenly on a circle of radius `r`, from `offset` degrees. */
	function ring(count: number, r: number, offset = 0) {
		return Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * TAU + (offset * Math.PI) / 180;
			return {
				x: Math.cos(angle) * r,
				y: Math.sin(angle) * r,
				deg: (angle * 180) / Math.PI
			};
		});
	}

	// Concentric bounding rings.
	const CIRCLES = [96, 168, 258, 340, 424, 472];

	// The seed of life: a centre circle ringed by six of its own radius.
	const SEED_R = 140;
	const SEED = [{ x: 0, y: 0 }, ...ring(6, SEED_R)];

	// A second flower ring, offset so its petals interlock with the first.
	const PETALS = ring(12, SEED_R * 2, 15);

	// Rays reaching from the inner rings out to the rim.
	const RAYS = ring(36, 1);

	// The cross, repeated around the mandala. Each one faces outward.
	const OUTER_MARKS = ring(12, 400);
	const INNER_MARKS = ring(6, 258, 30);

	const MARK_HALF = SIGIL_VIEWBOX / 2;

	/** Places one cross centred on (x, y), sized to `size`, turned by `deg`. */
	function markTransform(x: number, y: number, size: number, deg: number) {
		const scale = size / SIGIL_VIEWBOX;
		return `translate(${x} ${y}) rotate(${deg + 90}) scale(${scale}) translate(${-MARK_HALF} ${-MARK_HALF})`;
	}
</script>

<div class="sacred-field" aria-hidden="true">
	<!-- Ground: the dark the whole thing sits in -->
	<div class="ground"></div>

	<!-- Mandala: one static drawing, rasterised once -->
	<div class="mandala">
		<svg viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
			<defs>
				<radialGradient id="sacred-halo">
					<stop offset="0%" stop-color="rgba(255, 82, 82, 0.2)" />
					<stop offset="55%" stop-color="rgba(255, 82, 82, 0.05)" />
					<stop offset="100%" stop-color="rgba(255, 82, 82, 0)" />
				</radialGradient>
			</defs>

			<circle cx="0" cy="0" r="500" fill="url(#sacred-halo)" />

			{#each RAYS as ray, index (index)}
				<line
					x1={ray.x * 190}
					y1={ray.y * 190}
					x2={ray.x * 486}
					y2={ray.y * 486}
					class="ray"
					class:ray-long={index % 3 === 0}
				/>
			{/each}

			{#each CIRCLES as r (r)}
				<circle cx="0" cy="0" {r} class="rim" />
			{/each}

			{#each SEED as seed, index (index)}
				<circle cx={seed.x} cy={seed.y} r={SEED_R} class="petal" />
			{/each}

			{#each PETALS as petal, index (index)}
				<circle cx={petal.x} cy={petal.y} r={SEED_R} class="petal petal-faint" />
			{/each}

			{#each OUTER_MARKS as mark, index (index)}
				<path d={SIGIL_PATH} class="mark" transform={markTransform(mark.x, mark.y, 62, mark.deg)} />
			{/each}

			{#each INNER_MARKS as mark, index (index)}
				<path d={SIGIL_PATH} class="mark" transform={markTransform(mark.x, mark.y, 42, mark.deg)} />
			{/each}

			<!-- The mark at the centre. Only its opacity moves, which costs nothing. -->
			<path d={SIGIL_PATH} class="mark mark-heart" transform={markTransform(0, 0, 120, -90)} />
		</svg>
	</div>

	<!-- Scrim: keeps the words legible over all of it -->
	<div class="scrim"></div>
</div>

<style>
	.sacred-field {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: var(--color-void);
	}

	/* --- Ground ---------------------------------------------------------- */

	.ground {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(46% 62% at 78% 50%, rgba(255, 82, 82, 0.1), transparent 64%),
			radial-gradient(70% 90% at 92% 22%, rgba(120, 70, 66, 0.16), transparent 62%),
			radial-gradient(90% 120% at 8% 24%, rgba(58, 70, 92, 0.2), transparent 60%),
			linear-gradient(160deg, #0b1016, var(--color-void) 58%, #0a0d12);
	}

	/* --- Mandala ---------------------------------------------------------- */

	.mandala {
		position: absolute;
		top: 50%;
		right: 0;
		width: clamp(22rem, 64vh, 44rem);
		aspect-ratio: 1;
		/* Percentages here are of the disc itself, so the bleed past the right
		   edge stays the same fraction at every viewport width. */
		transform: translate(12%, -50%);
	}

	.mandala svg {
		width: 100%;
		height: 100%;
	}

	.ray {
		stroke: rgba(232, 225, 216, 0.075);
		stroke-width: 1;
	}

	.ray-long {
		stroke: rgba(255, 82, 82, 0.16);
	}

	.rim {
		fill: none;
		stroke: rgba(232, 225, 216, 0.11);
		stroke-width: 1;
	}

	.petal {
		fill: none;
		stroke: rgba(255, 82, 82, 0.17);
		stroke-width: 1;
	}

	.petal-faint {
		stroke: rgba(232, 225, 216, 0.07);
	}

	.mark {
		fill: rgba(255, 82, 82, 0.26);
	}

	.mark-heart {
		fill: rgba(255, 82, 82, 0.36);
		animation: heart-breathe 9s ease-in-out infinite;
	}

	@keyframes heart-breathe {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	/* --- Scrim ------------------------------------------------------------ */

	.scrim {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				100deg,
				rgba(5, 7, 10, 0.93) 20%,
				rgba(5, 7, 10, 0.6) 52%,
				rgba(5, 7, 10, 0.14) 100%
			),
			radial-gradient(130% 110% at 50% 50%, transparent 46%, rgba(5, 7, 10, 0.5) 100%);
	}

	/* On narrow screens the mandala centres behind the text and steps back. */
	@media (max-width: 1024px) {
		.mandala {
			right: 50%;
			width: min(96vh, 130vw);
			transform: translate(50%, -50%);
			opacity: 0.65;
		}

		.scrim {
			background:
				linear-gradient(180deg, rgba(5, 7, 10, 0.86), rgba(5, 7, 10, 0.78)),
				radial-gradient(120% 100% at 50% 50%, transparent 35%, rgba(5, 7, 10, 0.7) 100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mark-heart {
			animation: none;
		}
	}
</style>
