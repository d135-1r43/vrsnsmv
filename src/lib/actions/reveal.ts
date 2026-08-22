import { prefersReducedMotion } from '$lib/utils/motion';

interface RevealOptions {
	/** Stagger in milliseconds, forwarded to the CSS animation delay. */
	delay?: number;
	threshold?: number;
	/** Keep the element revealed once it has been seen (default). */
	once?: boolean;
}

/**
 * Lifts an element out of the dark as it scrolls into view.
 *
 * The element must carry the `veil` class in markup so the hidden state is
 * present on first paint — the action only flips it to `revealed`.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.15, once = true } = options;

	if (delay) {
		node.style.setProperty('--veil-delay', `${delay}ms`);
	}

	if (prefersReducedMotion()) {
		node.classList.add('revealed');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					if (once) observer.unobserve(entry.target);
				} else if (!once) {
					node.classList.remove('revealed');
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -6% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
