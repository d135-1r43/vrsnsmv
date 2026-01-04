<script lang="ts">
	import './layout.css';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';

	let { children } = $props();
</script>

{@render children()}
<ScrollToTop />
