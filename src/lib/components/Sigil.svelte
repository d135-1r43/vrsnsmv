<script lang="ts">
	import { SIGIL_PATH, SIGIL_VIEWBOX } from './sigil-path';

	/**
	 * The VRS:NSMV cross. Inherits its colour from `currentColor` so callers
	 * style it with a text colour like any other mark.
	 */
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<svg
	class={className}
	viewBox="0 0 {SIGIL_VIEWBOX} {SIGIL_VIEWBOX}"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	focusable="false"
>
	<path fill="currentColor" d={SIGIL_PATH} />
</svg>
