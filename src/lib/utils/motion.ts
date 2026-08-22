/**
 * Environment probes used by the interaction actions.
 *
 * Every ambient effect on the site is decorative, so each one checks these
 * before wiring up listeners. On a coarse pointer there is no hover to react
 * to, and with reduced motion the honest answer is to render the end state.
 */

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

/** Deterministic pseudo-random sequence so SSR and hydration agree. */
export function seededRandom(seed: number): () => number {
	let state = seed % 2147483647;
	if (state <= 0) state += 2147483646;
	return () => {
		state = (state * 16807) % 2147483647;
		return (state - 1) / 2147483646;
	};
}
