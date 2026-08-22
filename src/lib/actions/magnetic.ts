import { isCoarsePointer, prefersReducedMotion } from '$lib/utils/motion';

interface MagneticOptions {
	/** Fraction of the pointer offset the element follows. */
	strength?: number;
	/** Hard cap on the displacement, in pixels. */
	max?: number;
}

/**
 * Pulls an element a little toward the cursor, as if it were drawn to it.
 * Used on the ritual crosses and the scroll-to-top sigil.
 */
export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	const { strength = 0.3, max = 10 } = options;

	if (prefersReducedMotion() || isCoarsePointer()) {
		return {};
	}

	let frameId = 0;

	function apply(x: number, y: number) {
		node.style.setProperty('--pull-x', `${x}px`);
		node.style.setProperty('--pull-y', `${y}px`);
	}

	function handleMove(event: PointerEvent) {
		cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			const dx = event.clientX - (rect.left + rect.width / 2);
			const dy = event.clientY - (rect.top + rect.height / 2);
			apply(
				Math.max(-max, Math.min(max, dx * strength)),
				Math.max(-max, Math.min(max, dy * strength))
			);
		});
	}

	function handleLeave() {
		cancelAnimationFrame(frameId);
		apply(0, 0);
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
