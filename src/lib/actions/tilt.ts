import { isCoarsePointer, prefersReducedMotion } from '$lib/utils/motion';

interface TiltOptions {
	/** Maximum rotation on each axis, in degrees. */
	max?: number;
	/** Lift toward the viewer while hovered, in pixels. */
	lift?: number;
}

/**
 * Gives artwork a slight parallax turn under the cursor, like a relic being
 * angled toward the light. Writes `--tilt-x` / `--tilt-y` / `--tilt-z`.
 */
export function tilt(node: HTMLElement, options: TiltOptions = {}) {
	const { max = 6, lift = 14 } = options;

	if (prefersReducedMotion() || isCoarsePointer()) {
		return {};
	}

	let frameId = 0;

	function handleMove(event: PointerEvent) {
		cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			const px = (event.clientX - rect.left) / rect.width - 0.5;
			const py = (event.clientY - rect.top) / rect.height - 0.5;
			node.style.setProperty('--tilt-x', `${-py * max * 2}deg`);
			node.style.setProperty('--tilt-y', `${px * max * 2}deg`);
			node.style.setProperty('--tilt-z', `${lift}px`);
		});
	}

	function handleLeave() {
		cancelAnimationFrame(frameId);
		node.style.setProperty('--tilt-x', '0deg');
		node.style.setProperty('--tilt-y', '0deg');
		node.style.setProperty('--tilt-z', '0px');
	}

	node.addEventListener('pointermove', handleMove);
	node.addEventListener('pointerleave', handleLeave);

	return {
		destroy() {
			cancelAnimationFrame(frameId);
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
		}
	};
}
