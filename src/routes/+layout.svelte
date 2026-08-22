<script lang="ts">
	import './layout.css';
	import Atmosphere from '$lib/components/Atmosphere.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';

	let { children } = $props();
</script>

{@render children()}
<Atmosphere />
<ScrollToTop />
