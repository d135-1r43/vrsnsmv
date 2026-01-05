import { onMount } from 'svelte';

/**
 * Composable for detecting mobile devices based on viewport width
 * @param breakpoint Width threshold in pixels (default: 768)
 * @returns Object with reactive `isMobile` state
 */
export function useMobileDetect(breakpoint: number = 768) {
	let isMobile = $state(false);

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < breakpoint;
		};

		// Initial check
		checkMobile();

		// Update on window resize
		window.addEventListener('resize', checkMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkMobile);
	});

	return {
		get isMobile() {
			return isMobile;
		}
	};
}
