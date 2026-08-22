import { prefersReducedMotion } from '$lib/utils/motion';

/** Sigils and ritual marks the text passes through before it settles. */
const GLYPHS = '†‡✝✞⸸∴∵ΔΨΩΞΛ◈⧫⁂≒⌖';

interface ScrambleOptions {
	/** Frames each character waits before it starts resolving. */
	speed?: number;
	/** Extra random jitter, in frames, on each character's start. */
	spread?: number;
	/** Replay the decode on hover as well as on first sight. */
	onHover?: boolean;
	delay?: number;
}

/**
 * Decodes text out of arcane noise — used on section titles and the wordmark.
 *
 * Unresolved characters render as non-breaking spaces so the line never
 * reflows while the decode runs.
 */
export function scramble(node: HTMLElement, options: ScrambleOptions = {}) {
	const { speed = 1.6, spread = 8, onHover = false, delay = 0 } = options;
	const original = node.textContent ?? '';

	if (prefersReducedMotion() || original.length === 0) {
		return {};
	}

	// Longest the decode may take before the watchdog below ends it.
	const maxDuration = (original.length * speed + spread + 17) * 17 + 400;

	let frameId = 0;
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let watchdogId: ReturnType<typeof setTimeout> | undefined;
	let running = false;

	/** Abandon the decode and show the real text. */
	function settle() {
		cancelAnimationFrame(frameId);
		clearTimeout(watchdogId);
		node.textContent = original;
		running = false;
	}

	function play() {
		if (running) return;

		// A hidden tab is served no animation frames, so a decode started there
		// would sit as glyphs until the visitor came back. Show the text instead.
		if (document.hidden) {
			settle();
			return;
		}

		running = true;

		// An occluded window can stop serving animation frames without ever
		// reporting itself hidden, which would strand the text mid-decode.
		watchdogId = setTimeout(settle, maxDuration);

		const queue = [...original].map((char, index) => {
			const start = Math.floor(index * speed + Math.random() * spread);
			return { char, start, end: start + 5 + Math.floor(Math.random() * 12) };
		});

		let frame = 0;

		const tick = () => {
			let output = '';
			let settled = 0;

			for (const item of queue) {
				if (frame >= item.end) {
					output += item.char;
					settled++;
				} else if (item.char === ' ') {
					output += ' ';
				} else if (frame >= item.start) {
					output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
				} else {
					// Non-breaking space keeps the glyph's slot so the line never reflows.
					output += '\u00a0';
				}
			}

			node.textContent = output;

			if (settled === queue.length) {
				clearTimeout(watchdogId);
				running = false;
				return;
			}

			frame++;
			frameId = requestAnimationFrame(tick);
		};

		tick();
	}

	function start() {
		if (delay) {
			timeoutId = setTimeout(play, delay);
		} else {
			play();
		}
	}

	// Leaving the tab mid-decode would freeze the text as glyphs.
	function handleVisibility() {
		if (document.hidden && running) settle();
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					observer.unobserve(entry.target);
					start();
				}
			}
		},
		{ threshold: 0.4 }
	);

	observer.observe(node);
	document.addEventListener('visibilitychange', handleVisibility);

	if (onHover) {
		node.addEventListener('pointerenter', play);
	}

	return {
		destroy() {
			observer.disconnect();
			document.removeEventListener('visibilitychange', handleVisibility);
			clearTimeout(timeoutId);
			settle();
			if (onHover) node.removeEventListener('pointerenter', play);
		}
	};
}
