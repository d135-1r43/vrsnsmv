<script lang="ts">
	import { onMount } from 'svelte';
	import { SIGIL_PATH, SIGIL_VIEWBOX } from './sigil-path';
	import { isCoarsePointer, prefersReducedMotion, seededRandom } from '$lib/utils/motion';

	/**
	 * A generated backdrop: a rose window turning slowly in the dark, with dust
	 * drifting out through it. Nothing here is a bitmap.
	 *
	 * Bring a cursor near it and the window wakes — the rings quicken and
	 * brighten, dust is drawn toward the pointer as though to a second candle,
	 * the mark at the centre flares as you approach it, and entering or pressing
	 * sends a ring washing outward.
	 *
	 * It is drawn on a canvas rather than in SVG on purpose. Animating vector
	 * content — rotating a <g>, or rotating a wrapper around one — repaints the
	 * whole drawing every frame and wedged the renderer on a high-density
	 * display. A canvas is a single raster surface with a bounded backing store,
	 * so the cost is fixed no matter how much geometry is on it, and the loop is
	 * parked entirely while the section is off-screen.
	 */

	const TAU = Math.PI * 2;

	/** The drawing is authored in a 1000x1000 square centred on the origin. */
	const VIEW = SIGIL_VIEWBOX;
	const REACH = VIEW / 2;

	/** Largest backing-store edge, in device pixels. Caps the per-frame fill. */
	const MAX_BACKING = 1200;

	/** How far the pointer's pull reaches, in drawing units. */
	const PULL_REACH = 260;

	/** Seconds a ripple takes to cross the disc and fade. */
	const RIPPLE_LIFE = 1.5;

	// Concentric bounding rings.
	const CIRCLES = [96, 168, 258, 340, 424, 472];

	// The seed of life: a centre circle ringed by six of its own radius.
	const SEED_R = 140;
	const SEED: Array<[number, number]> = [
		[0, 0],
		...Array.from({ length: 6 }, (_, i): [number, number] => {
			const a = (i / 6) * TAU;
			return [Math.cos(a) * SEED_R, Math.sin(a) * SEED_R];
		})
	];

	// A second flower ring, offset so its petals interlock with the first.
	const PETALS: Array<[number, number]> = Array.from({ length: 12 }, (_, i): [number, number] => {
		const a = (i / 12) * TAU + Math.PI / 12;
		return [Math.cos(a) * SEED_R * 2, Math.sin(a) * SEED_R * 2];
	});

	const RAY_COUNT = 36;

	interface Mote {
		angle: number;
		radius: number;
		spin: number;
		drift: number;
		size: number;
		twinkle: number;
		ember: boolean;
		/** Displacement away from the orbit, while the pointer is pulling. */
		offX: number;
		offY: number;
	}

	interface Ripple {
		x: number;
		y: number;
		born: number;
	}

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const still = prefersReducedMotion();
		const hoverable = !still && !isCoarsePointer();
		const random = seededRandom(0xda57);
		const sigil = new Path2D(SIGIL_PATH);

		const motes: Mote[] = Array.from({ length: 84 }, () => ({
			angle: random() * TAU,
			radius: 50 + random() * 470,
			spin: (0.03 + random() * 0.09) * (random() < 0.5 ? -1 : 1),
			drift: 3 + random() * 15,
			size: 0.8 + random() * 2.6,
			twinkle: random() * TAU,
			ember: random() < 0.45,
			offX: 0,
			offY: 0
		}));

		// Pointer state, in drawing units relative to the disc centre.
		let pointerX = 0;
		let pointerY = 0;
		let pointerIn = false;
		/** Eases 0 -> 1 while hovered, so the waking and sleeping are gradual. */
		let wake = 0;
		const ripples: Ripple[] = [];

		// Rotation is accumulated rather than derived from the clock, so the
		// rings can speed up on hover without the angle jumping.
		let spinOuter = 0;
		let spinInner = 0;

		// The drawing's own clock. Ripples are stamped from this rather than
		// from performance.now(), so a pointer event landing between frames
		// cannot date a ripple ahead of the frame that first draws it.
		let clock = 0;

		function resize() {
			const rect = canvas.getBoundingClientRect();
			if (rect.width === 0) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const edge = Math.round(Math.min(rect.width * dpr, MAX_BACKING));
			if (canvas.width !== edge) {
				canvas.width = edge;
				canvas.height = edge;
			}
		}

		/** Maps a client point into the -500..500 drawing square. */
		function toDrawing(clientX: number, clientY: number) {
			const rect = canvas.getBoundingClientRect();
			return {
				x: ((clientX - rect.left) / rect.width) * VIEW - REACH,
				y: ((clientY - rect.top) / rect.height) * VIEW - REACH
			};
		}

		function addRipple(clientX: number, clientY: number) {
			const p = toDrawing(clientX, clientY);
			ripples.push({ x: p.x, y: p.y, born: clock });
			// A hard cap; they expire on their own well before this matters.
			if (ripples.length > 6) ripples.shift();
		}

		function drawDust(t: number, dt: number) {
			for (const mote of motes) {
				if (!still) {
					mote.angle += mote.spin * dt;
					mote.radius += mote.drift * dt;
					// Once a mote reaches the rim it is drawn back to the centre.
					if (mote.radius > 520) mote.radius = 40 + random() * 70;
				}

				const orbitX = Math.cos(mote.angle) * mote.radius;
				const orbitY = Math.sin(mote.angle) * mote.radius;

				// The pointer draws nearby dust toward it, like a second candle.
				let pull = 0;
				if (wake > 0.01) {
					const dx = pointerX - orbitX;
					const dy = pointerY - orbitY;
					const distance = Math.hypot(dx, dy);
					if (distance < PULL_REACH) {
						pull = (1 - distance / PULL_REACH) * wake;
						mote.offX += (dx * pull * 0.55 - mote.offX) * Math.min(1, dt * 5);
						mote.offY += (dy * pull * 0.55 - mote.offY) * Math.min(1, dt * 5);
					}
				}
				if (pull === 0) {
					// Drift back to the orbit once the pointer has moved on.
					const ease = Math.min(1, dt * 2.2);
					mote.offX += -mote.offX * ease;
					mote.offY += -mote.offY * ease;
				}

				// Fade in leaving the centre, fade out again at the rim.
				const leaving = Math.min(1, (mote.radius - 40) / 90);
				const arriving = Math.min(1, (520 - mote.radius) / 130);
				const pulse = 0.45 + 0.55 * Math.sin(t * 1.6 + mote.twinkle) ** 2;
				const alpha = Math.min(1, 0.55 * leaving * arriving * pulse * (1 + pull * 2.2));
				if (alpha <= 0.01) continue;

				ctx!.beginPath();
				ctx!.arc(orbitX + mote.offX, orbitY + mote.offY, mote.size * (1 + pull * 0.8), 0, TAU);
				ctx!.fillStyle = mote.ember
					? `rgba(255, 82, 82, ${alpha})`
					: `rgba(232, 225, 216, ${alpha * 0.65})`;
				ctx!.fill();
			}
		}

		function drawRipples(now: number) {
			for (let i = ripples.length - 1; i >= 0; i--) {
				const age = now - ripples[i].born;
				if (age > RIPPLE_LIFE) {
					ripples.splice(i, 1);
					continue;
				}
				const progress = Math.max(0, age) / RIPPLE_LIFE;
				const fade = (1 - progress) ** 2;
				ctx!.beginPath();
				ctx!.arc(ripples[i].x, ripples[i].y, progress * 460, 0, TAU);
				ctx!.strokeStyle = `rgba(255, 82, 82, ${0.4 * fade})`;
				ctx!.lineWidth = 1 + 2 * fade;
				ctx!.stroke();
			}
		}

		function draw(t: number, dt: number) {
			clock = t;
			// Ease the waking, and turn the rings by however much time has passed.
			wake += ((pointerIn ? 1 : 0) - wake) * Math.min(1, dt * 3.5);
			spinOuter += (0.055 + 0.11 * wake) * dt;
			spinInner -= (0.085 + 0.15 * wake) * dt;

			const edge = canvas.width;
			ctx!.clearRect(0, 0, edge, edge);

			ctx!.save();
			ctx!.translate(edge / 2, edge / 2);
			ctx!.scale(edge / VIEW, edge / VIEW);

			// Halo — the light the window is set against, brighter once woken.
			const breath = 1 + 0.05 * Math.sin(t * 0.5);
			const halo = ctx!.createRadialGradient(0, 0, 0, 0, 0, REACH * breath);
			halo.addColorStop(0, `rgba(255, 82, 82, ${0.2 + 0.16 * wake})`);
			halo.addColorStop(0.55, `rgba(255, 82, 82, ${0.05 + 0.05 * wake})`);
			halo.addColorStop(1, 'rgba(255, 82, 82, 0)');
			ctx!.fillStyle = halo;
			ctx!.beginPath();
			ctx!.arc(0, 0, REACH, 0, TAU);
			ctx!.fill();

			const lift = 1 + 1.5 * wake;

			// Rays and rims turn one way, breathing as they go.
			ctx!.save();
			ctx!.rotate(spinOuter);
			for (let i = 0; i < RAY_COUNT; i++) {
				const a = (i / RAY_COUNT) * TAU;
				const reach = 486 * (1 + 0.035 * Math.sin(t * 0.6 + i * 0.35));
				ctx!.beginPath();
				ctx!.moveTo(Math.cos(a) * 190, Math.sin(a) * 190);
				ctx!.lineTo(Math.cos(a) * reach, Math.sin(a) * reach);
				ctx!.strokeStyle =
					i % 3 === 0
						? `rgba(255, 82, 82, ${0.16 * lift})`
						: `rgba(232, 225, 216, ${0.075 * lift})`;
				ctx!.lineWidth = 1;
				ctx!.stroke();
			}
			CIRCLES.forEach((r, i) => {
				ctx!.beginPath();
				ctx!.arc(0, 0, r * (1 + 0.02 * Math.sin(t * 0.42 + i * 0.8)), 0, TAU);
				ctx!.strokeStyle = `rgba(232, 225, 216, ${0.11 * lift})`;
				ctx!.lineWidth = 1;
				ctx!.stroke();
			});
			ctx!.restore();

			// The flower turns against them.
			ctx!.save();
			ctx!.rotate(spinInner);
			const petalR = SEED_R * (1 + 0.03 * Math.sin(t * 0.35));
			for (const [x, y] of SEED) {
				ctx!.beginPath();
				ctx!.arc(x, y, petalR, 0, TAU);
				ctx!.strokeStyle = `rgba(255, 82, 82, ${0.17 * lift})`;
				ctx!.lineWidth = 1;
				ctx!.stroke();
			}
			for (const [x, y] of PETALS) {
				ctx!.beginPath();
				ctx!.arc(x, y, petalR, 0, TAU);
				ctx!.strokeStyle = `rgba(232, 225, 216, ${0.07 * lift})`;
				ctx!.lineWidth = 1;
				ctx!.stroke();
			}
			ctx!.restore();

			drawRipples(t);
			drawDust(t, dt);

			// The one mark, at the centre of it all. It flares as you near it.
			const nearHeart = wake * (1 - Math.min(1, Math.hypot(pointerX, pointerY) / 320));
			const size = 190 * (1 + 0.03 * Math.sin(t * 0.55) + 0.09 * nearHeart);
			const scale = size / VIEW;
			ctx!.save();
			ctx!.scale(scale, scale);
			ctx!.translate(-REACH, -REACH);
			ctx!.fillStyle = `rgba(255, 82, 82, ${0.34 + 0.1 * Math.sin(t * 0.7) + 0.35 * nearHeart})`;
			ctx!.shadowColor = 'rgba(255, 82, 82, 0.55)';
			ctx!.shadowBlur = 60 + 90 * nearHeart;
			ctx!.fill(sigil);
			ctx!.restore();

			ctx!.restore();
		}

		let frameId = 0;
		let running = false;
		let last = 0;

		function loop(now: number) {
			// Clamp so a backgrounded tab cannot fling the dust across the disc.
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			draw(now / 1000, dt);
			frameId = requestAnimationFrame(loop);
		}

		function start() {
			if (running || still) return;
			running = true;
			last = performance.now();
			frameId = requestAnimationFrame(loop);
		}

		function stop() {
			running = false;
			cancelAnimationFrame(frameId);
		}

		resize();
		draw(0, 0);

		// Nothing is drawn while the section is out of sight.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) start();
					else stop();
				}
			},
			{ rootMargin: '10% 0px' }
		);
		observer.observe(canvas);

		const resizer = new ResizeObserver(() => {
			resize();
			if (!running) draw(0, 0);
		});
		resizer.observe(canvas);

		function handleEnter(event: PointerEvent) {
			pointerIn = true;
			const p = toDrawing(event.clientX, event.clientY);
			pointerX = p.x;
			pointerY = p.y;
			addRipple(event.clientX, event.clientY);
		}

		function handleMove(event: PointerEvent) {
			pointerIn = true;
			const p = toDrawing(event.clientX, event.clientY);
			pointerX = p.x;
			pointerY = p.y;
		}

		function handleLeave() {
			pointerIn = false;
		}

		function handleDown(event: PointerEvent) {
			addRipple(event.clientX, event.clientY);
		}

		if (hoverable) {
			canvas.addEventListener('pointerenter', handleEnter);
			canvas.addEventListener('pointermove', handleMove);
			canvas.addEventListener('pointerleave', handleLeave);
			canvas.addEventListener('pointerdown', handleDown);
		}

		return () => {
			stop();
			observer.disconnect();
			resizer.disconnect();
			if (hoverable) {
				canvas.removeEventListener('pointerenter', handleEnter);
				canvas.removeEventListener('pointermove', handleMove);
				canvas.removeEventListener('pointerleave', handleLeave);
				canvas.removeEventListener('pointerdown', handleDown);
			}
		};
	});
</script>

<div class="sacred-field" aria-hidden="true">
	<!-- Ground: the dark the whole thing sits in -->
	<div class="ground"></div>

	<!-- Mandala and dust, drawn on one surface -->
	<div class="mandala">
		<canvas bind:this={canvas}></canvas>
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

	.ground {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(46% 62% at 78% 50%, rgba(255, 82, 82, 0.1), transparent 64%),
			radial-gradient(70% 90% at 92% 22%, rgba(120, 70, 66, 0.16), transparent 62%),
			radial-gradient(90% 120% at 8% 24%, rgba(58, 70, 92, 0.2), transparent 60%),
			linear-gradient(160deg, #0b1016, var(--color-void) 58%, #0a0d12);
	}

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

	.mandala canvas {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* The scrim sits over the disc, so it must let the pointer through for the
	   canvas to know it is being hovered. */
	.scrim {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(
				100deg,
				rgba(5, 7, 10, 0.93) 20%,
				rgba(5, 7, 10, 0.6) 52%,
				rgba(5, 7, 10, 0.14) 100%
			),
			radial-gradient(130% 110% at 50% 50%, transparent 46%, rgba(5, 7, 10, 0.5) 100%);
	}

	/* On narrow screens the window centres behind the text and steps back. */
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
</style>
