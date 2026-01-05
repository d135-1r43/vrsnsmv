<script lang="ts">
	import { smoothScroll } from '$lib/utils/smoothScroll';

	let { isOpen = $bindable(false) } = $props();

	function handleNavClick(targetId: string) {
		smoothScroll(targetId);
		isOpen = false;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		isOpen = false;
	}
</script>

<!-- Hamburger Button -->
<div class="toggle-mobile-but lg:hidden">
	<button
		class="mobile-but p-0 border-0 bg-transparent cursor-pointer relative w-8 h-6"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Toggle mobile menu"
		aria-expanded={isOpen}
	>
		<div class="lines">
			<span
				class="block w-full h-0.5 bg-white absolute transition-all duration-300 {isOpen
					? 'top-1/2 rotate-45 -translate-y-1/2'
					: 'top-0'}"
			></span>
			<span
				class="block w-full h-0.5 bg-white absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 {isOpen
					? 'opacity-0'
					: 'opacity-100'}"
			></span>
			<span
				class="block w-full h-0.5 bg-white absolute transition-all duration-300 {isOpen
					? 'top-1/2 -rotate-45 -translate-y-1/2'
					: 'bottom-0'}"
			></span>
		</div>
	</button>
</div>

<!-- Mobile Menu -->
{#if isOpen}
	<nav
		class="mobile-menu fixed top-[80px] left-0 right-0 bg-dark z-40 lg:hidden overflow-hidden transition-all duration-300"
	>
		<ul class="flex flex-col p-0 m-0 list-none">
			<li class="border-b border-white/10">
				<button
					class="w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
					onclick={scrollToTop}
				>
					Home
				</button>
			</li>
			<li class="border-b border-white/10">
				<button
					class="w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
					onclick={() => handleNavClick('tour')}
				>
					Performances
				</button>
			</li>
			<li class="border-b border-white/10">
				<button
					class="w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
					onclick={() => handleNavClick('album')}
				>
					Latest Release
				</button>
			</li>
			<li class="border-b border-white/10">
				<a
					href="/music"
					class="block w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors no-underline"
					onclick={() => (isOpen = false)}
				>
					Music
				</a>
			</li>
			<li class="border-b border-white/10">
				<button
					class="w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
					onclick={() => handleNavClick('about')}
				>
					About
				</button>
			</li>
			<li>
				<button
					class="w-full text-left px-6 py-4 font-nav font-semibold text-xs uppercase text-white tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
					onclick={() => handleNavClick('contact')}
				>
					Contact
				</button>
			</li>
		</ul>
	</nav>
{/if}
