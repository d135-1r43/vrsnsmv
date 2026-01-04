<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			visible = window.scrollY > 500;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	class="fixed right-12 bottom-16 w-14 h-14 bg-primary text-white text-center transition-all duration-300 z-50 cursor-pointer border-0 flex items-center justify-center {visible
		? 'opacity-100'
		: 'opacity-0 pointer-events-none'}"
	onclick={scrollToTop}
	aria-label="Scroll to top"
>
	<i class="icon-angle-up text-xl"></i>
</button>
