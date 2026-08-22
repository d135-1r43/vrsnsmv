import { isCoarsePointer, prefersReducedMotion } from '$lib/utils/motion';

/**
 * Tracks the pointer inside an element as `--spot-x` / `--spot-y` percentages
 * and raises `--spot` from 0 to 1 while hovered — a candle carried across a
 * surface. The CSS decides what to do with the light.
 */
export function spotlight(node: HTMLElement) {
	if (prefersReducedMotion() || isCoarsePointer()) {
		return {};
	}

	let frameId = 0;

	function handleMove(event: PointerEvent) {
		cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			node.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
			node.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
		});
	}

	function handleEnter() {
		node.style.setProperty('--spot', '1');
	}

	function handleLeave() {
		cancelAnimationFrame(frameId);
		node.style.setProperty('--spot', '0');
	}

	node.addEventListener('pointerenter', handleEnter);
	node.addEventListener('pointermove', handleMove);
	node.addEventListener('pointerleave', handleLeave);

	return {
		destroy() {
			cancelAnimationFrame(frameId);
			node.removeEventListener('pointerenter', handleEnter);
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
		}
	};
}
